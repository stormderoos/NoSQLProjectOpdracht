import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../player.service';
import { IPlayer, PlayerPosition } from '@avans-nx-workshop/shared/api';
import { Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css'],
})
export class PlayerEditComponent implements OnInit {
    playerForm: FormGroup;
    loading = true;
    errorMessage: string | null = null;
    positions = Object.values(PlayerPosition);
  
    constructor(
      private fb: FormBuilder,
      private playerService: PlayerService,
      private route: ActivatedRoute,
      private router: Router
    ) {
      this.playerForm = this.fb.group({
        _id: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        position: ['', Validators.required],
        clubId: [''],
        birthdate: ['', Validators.required],
        profileImageUrl: [''] 
      });
    }
  
    ngOnInit(): void {
      const id = this.route.snapshot.paramMap.get('id');
      if (id) {
        this.playerService.getPlayerById(id).subscribe(
          (player: IPlayer) => {
            this.playerForm.patchValue({
              _id: player._id,
              firstName: player.firstName,
              lastName: player.lastName,
              position: player.position,
              clubId: player.clubId || '',
              birthdate: new Date(player.birthdate).toISOString().split('T')[0],
              profileImageUrl: player.profileImageUrl || '',
            });
            this.loading = false;
          },
          (error) => {
            console.error('Error fetching player:', error);
            this.loading = false;
            this.errorMessage = 'Failed to load player details. Please try again later.';  // Set the error message here
          }
        );
      } else {
        console.error('ID parameter is missing in the route!');
        this.loading = false;
      }
    }
  
    onSubmit(): void {
      this.errorMessage = null;  // Reset error message on submit attempt
  
      if (this.playerForm.valid && this.playerForm.value._id) {
        const updatedPlayer: IPlayer = {
          _id: this.playerForm.value._id,
          firstName: this.playerForm.value.firstName,
          lastName: this.playerForm.value.lastName,
          position: this.playerForm.value.position as PlayerPosition,
          clubId: this.playerForm.value.clubId,
          birthdate: new Date(this.playerForm.value.birthdate),
          profileImageUrl: this.playerForm.value.profileImageUrl,
        };
  
        this.playerService.updatePlayer(updatedPlayer).subscribe(
          (response) => {
            console.log('Player successfully updated:', response);
            this.router.navigate(['/players']);
          },
          (error) => {
            console.error('Error updating player:', error);
            this.errorMessage = 'Failed to update player. Please try again later.';  // Set the error message here
          }
        );
      } else {
        console.error('Form is invalid or ID is missing!');
        this.errorMessage = 'Please fill out all required fields correctly.';  // Form validation error message
      }
    }
}