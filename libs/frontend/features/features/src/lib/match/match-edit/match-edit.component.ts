import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from '../match.service';
import { PlayerService } from '../../player/player.service';
import { ClubService } from '../../club/club.service';
import { IClub, IMatch, IPlayer } from '@avans-nx-workshop/shared/api';

interface ScoreEntry {
  playerId: string;
  goals: number;
}

interface AssistEntry {
  playerId: string;
  assists: number;
}

@Component({
  selector: 'avans-nx-workshop-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {
  match: any = {
    _id: '',
    homeTeamId: '',
    awayTeamId: '',
    homeScore: 0,
    awayScore: 0,
    matchDate: '',
    location: '',
    homeScorers: [] as ScoreEntry[],
    awayScorers: [] as ScoreEntry[],
    homeAssisters: [] as AssistEntry[],
    awayAssisters: [] as AssistEntry[]
  };

  private allScorers: ScoreEntry[] = [];
  private allAssisters: AssistEntry[] = [];

  clubs: IClub[] = [];
  homePlayers: IPlayer[] = [];
  awayPlayers: IPlayer[] = [];
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private matchService: MatchService,
    private playerService: PlayerService,
    private clubService: ClubService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const matchId = this.route.snapshot.paramMap.get('_id');
    if (matchId) {
      this.fetchMatchDetails(matchId);
    } else {
      this.errorMessage = 'Match ID ontbreekt.';
      this.loading = false;
    }
    this.loadClubs();
  }

  fetchMatchDetails(matchId: string): void {
    this.loading = true;
    this.matchService.getMatchById(matchId).subscribe({
      next: (matchData: IMatch) => {
        const formattedDate = new Date(matchData.date).toISOString().slice(0, 16);
        this.allScorers = (matchData.scorers || []).map(scorer =>
          typeof scorer === 'string' ? { playerId: scorer, goals: 1 } : scorer
        );
        this.allAssisters = (matchData.assisters || []).map(assister =>
          typeof assister === 'string' ? { playerId: assister, assists: 1 } : assister
        );
  
        this.match = {
          _id: matchData._id,
          homeTeamId: matchData.home_club_id,
          awayTeamId: matchData.away_club_id,
          homeScore: matchData.score_home ?? 0,
          awayScore: matchData.score_away ?? 0,
          matchDate: formattedDate,
          location: matchData.location,
          homeScorers: [] as ScoreEntry[],
          awayScorers: [] as ScoreEntry[],
          homeAssisters: [] as AssistEntry[],
          awayAssisters: [] as AssistEntry[]
        };
        
        this.loadPlayersForTeam(matchData.home_club_id, 'home');
        this.loadPlayersForTeam(matchData.away_club_id, 'away');
        this.loading = false;
      },
      error: (err) => {
        console.error('Fout bij het ophalen van matchgegevens:', err);
        this.errorMessage = 'Het ophalen van matchgegevens is mislukt. Probeer het later opnieuw.';
        this.loading = false;
      }
    });
  }

  loadPlayersForTeam(teamId: string, side: string): void {
    if (!teamId) { return; }
    this.playerService.getPlayersByClub(teamId).subscribe({
      next: (players: IPlayer[]) => {
        if (side === 'home') {
          this.homePlayers = players;
        } else if (side === 'away') {
          this.awayPlayers = players;
        }
        if ((this.homePlayers && this.homePlayers.length) && (this.awayPlayers && this.awayPlayers.length)) {
          this.splitScorers();
          this.splitAssisters();
        }
      },
      error: (err) => {
        console.error(`Fout bij het laden van spelers voor team ${teamId}:`, err);
      }
    });
  }

  loadClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (clubs: IClub[]) => {
        this.clubs = clubs;
      },
      error: (err) => {
        console.error('Fout bij het laden van clubs:', err);
      }
    });
  }

  private splitScorers(): void {
    const home: ScoreEntry[] = [];
    const away: ScoreEntry[] = [];
    for (const scorer of this.allScorers) {
      const inHome = this.homePlayers.some(player => player._id === scorer.playerId);
      const inAway = this.awayPlayers.some(player => player._id === scorer.playerId);
      if (inHome) {
        home.push(scorer);
      } else if (inAway) {
        away.push(scorer);
      } else {
        home.push(scorer);
      }
    }
    this.match.homeScorers = home;
    this.match.awayScorers = away;
  }

  private splitAssisters(): void {
    const home: AssistEntry[] = [];
    const away: AssistEntry[] = [];
    for (const assister of this.allAssisters) {
      const inHome = this.homePlayers.some(player => player._id === assister.playerId);
      const inAway = this.awayPlayers.some(player => player._id === assister.playerId);
      if (inHome) {
        home.push(assister);
      } else if (inAway) {
        away.push(assister);
      } else {
        home.push(assister);
      }
    }
    this.match.homeAssisters = home;
    this.match.awayAssisters = away;
  }

  addHomeScorer(): void {
    this.match.homeScorers.push({ playerId: '', goals: 1 });
  }
  removeHomeScorer(index: number): void {
    this.match.homeScorers.splice(index, 1);
  }
  addAwayScorer(): void {
    this.match.awayScorers.push({ playerId: '', goals: 1 });
  }
  removeAwayScorer(index: number): void {
    this.match.awayScorers.splice(index, 1);
  }

  addHomeAssister(): void {
    this.match.homeAssisters.push({ playerId: '', assists: 1 });
  }
  removeHomeAssister(index: number): void {
    this.match.homeAssisters.splice(index, 1);
  }
  addAwayAssister(): void {
    this.match.awayAssisters.push({ playerId: '', assists: 1 });
  }
  removeAwayAssister(index: number): void {
    this.match.awayAssisters.splice(index, 1);
  }

  onSubmit(matchForm: any): void {
    if (matchForm.valid && this.match._id) {
      const updatedMatch: IMatch = {
        _id: this.match._id,
        location: this.match.location,
        home_club_id: this.match.homeTeamId,
        away_club_id: this.match.awayTeamId,
        score_home: this.match.homeScore,
        score_away: this.match.awayScore,
        date: this.match.matchDate,
        scorers: [
          ...this.match.homeScorers,
          ...this.match.awayScorers
        ],
        assisters: [
          ...this.match.homeAssisters,
          ...this.match.awayAssisters
        ]
      };
  
      this.matchService.updateMatch(updatedMatch).subscribe({
        next: () => {
          console.log('Match succesvol opgeslagen');
          this.router.navigate(['/matches']);
        },
        error: (error) => {
          console.error('Fout bij het updaten van de match:', error);
          this.errorMessage = 'Het updaten van de match is mislukt. Probeer het later opnieuw.';
        }
      });
    } else {
      console.error('Formulier is ongeldig of ID ontbreekt!');
      this.errorMessage = 'Vul alle verplichte velden correct in.';
    }
  }
}