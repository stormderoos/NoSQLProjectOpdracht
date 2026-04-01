import { Component, OnInit } from '@angular/core';
import { ClubService } from '../club/club.service';
import { MatchService } from '../match/match.service';
import { PlayerService } from '../player/player.service';
import { IClub, IMatch, IPlayer } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-home',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  clubs: IClub[] = [];
  matches: IMatch[] = [];
  players: IPlayer[] = [];
  topPlayers: IPlayer[] = [];
  defaultImage = '/assets/footballplayer.png'; 

  constructor(
    private clubService: ClubService,
    private matchService: MatchService,
    private playerService: PlayerService
  ) {}

  ngOnInit(): void {
    this.loadClubs();
    this.loadMatches();
    this.loadPlayers();
  }

  loadClubs() {
    this.clubService.getClubs().subscribe({
      next: (data) => this.clubs = data
    });
  }

  loadMatches() {
    this.matchService.getMatches().subscribe({
      next: (data) => this.matches = data.slice(0, 3)
    });
  }

  loadPlayers() {
    this.playerService.getPlayers().subscribe({
      next: (data) => {
        this.players = data;
        this.topPlayers = this.getTopPlayers(data);
      }
    });
  }

  getTopPlayers(players: IPlayer[]): IPlayer[] {
    return [...players]
      .sort((a, b) => ((b.goals ?? 0) + (b.assists ?? 0)) - ((a.goals ?? 0) + (a.assists ?? 0)))
      .slice(0, 3);
  }

  getClubById(id: string): IClub | undefined {
    return this.clubs.find(c => c._id === id);
  }

  getClubNameById(id: string): string {
    return this.getClubById(id)?.name ?? 'Onbekende club';
  }

  getClubLogoById(id: string): string {
    return this.getClubById(id)?.logoUrl ?? '/assets/default-club.png';
  }

  getClubLocationById(id: string): string {
    return this.getClubById(id)?.location ?? 'Onbekende locatie';
  }
}