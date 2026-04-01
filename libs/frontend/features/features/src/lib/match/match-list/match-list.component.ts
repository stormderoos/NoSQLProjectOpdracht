import { Component, OnInit } from '@angular/core';
import { MatchService } from '../match.service';
import { ClubService } from '../../club/club.service';
import { Router } from '@angular/router';
import { IMatch, IClub } from '@avans-nx-workshop/shared/api';
import { AuthService } from '../../auth.service';
@Component({
  selector: 'avans-nx-workshop-match',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.css'],
})
export class MatchListComponent implements OnInit {
  matches: IMatch[] = [];
  clubs: IClub[] = [];
  loading = false;
  error: string | null = null;
  userRole: string | null = null;


  constructor(
    private matchService: MatchService,
    private clubService: ClubService,
    private router: Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.fetchMatches();
    this.fetchClubs();
  }

  fetchMatches(): void {
    this.loading = true;
    this.matchService.getMatches().subscribe({
      next: (data: IMatch[]) => {
        if (!Array.isArray(data)) {
          console.error('Invalid response format:', data);
          this.error = 'Invalid response format.';
          this.loading = false;
          return;
        }
        this.matches = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching matches:', err);
        this.error = 'Failed to load matches. Please try again later.';
        this.loading = false;
      },
    });
  }

  fetchClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (data: IClub[]) => {
        this.clubs = data;
      },
      error: (err) => {
        console.error('Error fetching clubs:', err);
        this.error = 'Failed to load clubs. Please try again later.';
      },
    });
  }

  getClubNameById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.name : 'Unknown Club';
  }

  getClubLogoById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.logoUrl : 'default-logo-url'; 
  }

  getClubLocationById(clubId: string): string {
    const club = this.clubs.find(c => c._id === clubId);
    return club ? club.location : 'Unknown Location';
  }


  addMatch(): void {
    this.router.navigate(['/matches/create']); 
  }
  
  deleteMatch(matchId: string): void {
    this.matchService.deleteMatch(matchId).subscribe(() => {
      this.fetchMatches(); 
    });
  }
}