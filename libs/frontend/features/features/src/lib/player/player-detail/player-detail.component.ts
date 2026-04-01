import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubService } from '../../club/club.service';
import { IPlayer, IClub } from '@avans-nx-workshop/shared/api';
import { AuthService } from "../../auth.service";

@Component({
  selector: 'avans-nx-workshop-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.css'],
})
export class PlayerDetailComponent implements OnInit {
  player: IPlayer | null = null;
  loading = false;
  error: string | null = null;
  clubName!: string;
  clubLogoUrl!: string;
  userRole: string | null = null;
  constructor(private route: ActivatedRoute, private clubService: ClubService, private authService : AuthService) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); // toevoegen
    const playerId = this.route.snapshot.paramMap.get('_id');
    if (playerId) {
      this.fetchPlayerDetails(playerId);
    } else {
      this.error = 'Player ID not found.';
    }

  }

  fetchPlayerDetails(playerId: string): void {
    this.loading = true;
    this.error = null;

    this.clubService.getPlayerById(playerId).subscribe({
      next: (data: IPlayer) => {
        this.player = data;
        this.loading = false;
        if (this.player?.clubId) {
          this.clubService.getClubById(this.player.clubId).subscribe({
            next: (club: IClub) => {
              this.clubName = club.name;
              this.clubLogoUrl = club.logoUrl;
            },
            error: () => {
              this.clubName = 'Onbekend';
            }
          });
        }
      },
      error: (err) => {
        console.error('Error fetching player details:', err);
        this.error = 'Fout bij ophalen spelergegevens.';
        this.loading = false;
      },
    });
  }

  getAge(birthdate: Date): number {
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }
}