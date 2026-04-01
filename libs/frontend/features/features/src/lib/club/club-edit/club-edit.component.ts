import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../club.service';
import { PlayerService } from '../../player/player.service';
import { IClub, IPlayer } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css'],
})
export class ClubEditComponent implements OnInit {
  clubForm: FormGroup;
  loading = true;
  players: IPlayer[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private clubService: ClubService,
    private playerService: PlayerService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.clubForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      location: ['', Validators.required],
      logoUrl: ['', Validators.required],
      players: [[]], 
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.clubService.getClubById(id).subscribe({
        next: (club: IClub) => {
          this.clubForm.patchValue({
            _id: club._id,
            name: club.name,
            location: club.location,
            logoUrl: club.logoUrl,
            players: club.players || [],
          });

          this.clubService.getPlayers().subscribe({
            next: (players: IPlayer[]) => {
              this.players = players;
              this.loading = false;
            },
            error: (error) => {
              console.error('Error fetching players:', error);
              this.errorMessage = 'Failed to load players.';
              this.loading = false;
            },
          });
        },
        error: (error) => {
          console.error('Error fetching club:', error);
          this.errorMessage = 'Failed to load club details.';
          this.loading = false;
        },
      });
    } else {
      this.errorMessage = 'Missing club ID in route.';
      this.loading = false;
    }
  }

  get filteredPlayers(): IPlayer[] {
    const currentClubId = this.clubForm.get('id')?.value;
    return this.players.filter(player =>
      !player.clubId || player.clubId === currentClubId
    );
  }

  onSubmit(): void {
    this.errorMessage = null;

    if (this.clubForm.valid && this.clubForm.value._id) {
      const updatedClub: IClub = {
        _id: this.clubForm.value._id,
        name: this.clubForm.value.name,
        location: this.clubForm.value.location,
        logoUrl: this.clubForm.value.logoUrl,
        players: this.clubForm.value.players || [],
      };

      this.clubService.updateClub(updatedClub).subscribe({
        next: () => {
          updatedClub.players?.forEach((playerId: string) => {
            this.clubService.updatePlayerClubId(playerId, updatedClub._id).subscribe({
              error: (err) =>
                console.error(`Failed to update clubId for player ${playerId}:`, err),
            });
          });

          this.router.navigate(['/clubs']);
        },
        error: (error) => {
          console.error('Error updating club:', error);
          if (error instanceof Error) {
            this.errorMessage = error.message || 'Unexpected error occurred.';
          } else if (typeof error === 'object' && error !== null) {
            this.errorMessage = (error as any).message || 'Unknown error occurred.';
          } else {
            this.errorMessage = error;
          }
        },
      });
    } else {
      this.errorMessage = 'Form is invalid or missing club ID.';
    }
  }
}