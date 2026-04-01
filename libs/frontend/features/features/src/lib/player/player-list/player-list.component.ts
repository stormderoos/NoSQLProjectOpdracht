import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { IPlayer } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'avans-nx-workshop-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css'],
})
export class PlayerListComponent implements OnInit {
  players: IPlayer[] = [];
  loading = false;
  error: string | null = null;
  clubs: { _id: string; name: string }[] = [];
  searchTerm = '';
  userRole: string | null = null;

  defaultImage = '/assets/footballplayer.png';

  constructor(
    private playerService: PlayerService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fetchPlayers();
    this.userRole = this.authService.getUserRole();

    this.playerService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs = clubs;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      },
    });
  }

  fetchPlayers(): void {
    this.loading = true;
    this.error = null;

    this.playerService.getPlayers().subscribe({
      next: (data: IPlayer[]) => {
        this.players = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
        this.error = 'Failed to load players. Please try again later.';
        this.loading = false;
      },
    });
  }

  get filteredPlayers(): IPlayer[] {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) return this.players;

    return this.players.filter((player) =>
      `${player.firstName} ${player.lastName}`.toLowerCase().includes(term)
    );
  }

  goToPlayerDetails(playerId: string): void {
    this.router.navigate([`/players/${playerId}`]);
  }

  getClubNameById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.name : 'Geen club';
  }
}