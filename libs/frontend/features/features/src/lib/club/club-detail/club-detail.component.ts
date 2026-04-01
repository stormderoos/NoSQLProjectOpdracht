import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubService } from '../club.service';
import { IClub, IPlayer, IMatch } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'avans-nx-workshop-club-detail',
  templateUrl: './club-detail.component.html',
  styleUrls: ['./club-detail.component.css'],
})
export class ClubDetailComponent implements OnInit {
  club: IClub | null = null;
  players: IPlayer[] = [];
  matches: IMatch[] = [];
  clubs: { _id: string; name: string; logoUrl: string }[] = [];
  loading = false;
  error: string | null = null;
  userRole: string | null = null;
  activeTab: 'team' | 'matches' = 'team';
  positionGroups = [
    { label: 'Keepers', positions: ['GK'] },
    { label: 'Verdedigers', positions: ['CB', 'LB', 'RB'] },
    { label: 'Middenvelders', positions: ['CDM', 'CM', 'CAM'] },
    { label: 'Aanvallers', positions: ['LW', 'ST', 'RW'] }
  ];

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private clubService: ClubService
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole(); 
    const clubId = this.route.snapshot.paramMap.get('id');
    if (clubId) {
      this.fetchClubDetails(clubId);
      this.fetchPlayersDetails(clubId);
      this.fetchClubMatches(clubId);
    } else {
      this.error = 'Club ID not found.';
    }

    this.clubService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs = clubs;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
      },
    });
  }

  fetchClubDetails(clubId: string): void {
    this.loading = true;
    this.clubService.getClubById(clubId).subscribe({
      next: (data: IClub) => {
        this.club = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching club details:', err);
        this.error = 'Failed to load club details.';
        this.loading = false;
      },
    });
  }

  fetchPlayersDetails(clubId: string): void {
    this.clubService.getPlayersByClub(clubId).subscribe({
      next: (data: IPlayer[]) => {
        this.players = data;
      },
      error: (err) => {
        console.error('Error fetching players:', err);
      },
    });
  }

  fetchClubMatches(clubId: string): void {
    this.clubService.getMatchesByClub(clubId).subscribe({
      next: (data: IMatch[]) => {
        this.matches = data;
      },
      error: (err) => {
        console.error('Error fetching matches:', err);
      },
    });
  }

  getClubName(id: string): string {
    const club = this.clubs.find(c => c._id === id);
    return club ? club.name : 'Onbekend';
  }
  
  getClubLogoById(id: string): string {
    const club = this.clubs.find(c => c._id === id);
    return club ? club.logoUrl : '/assets/default-club-logo.png';
  }

  goToPlayerDetails(playerId: string): void {
    this.router.navigate([`/players/${playerId}`]);
  }

  setTab(tab: 'team' | 'matches') {
    this.activeTab = tab;
  }
}