import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatchService } from '../match.service';
import { ClubService } from '../../club/club.service';
import { IMatch, IClub } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css'],
})
export class MatchCreateComponent implements OnInit {
  matchForm: FormGroup;
  error: string | null = null;
  loading = false;
  clubs: IClub[] = [];

  constructor(
    private fb: FormBuilder,
    private matchService: MatchService,
    private clubService: ClubService,
    private router: Router
  ) {
    this.matchForm = this.fb.group({
      home_club_id: ['', Validators.required],
      away_club_id: ['', Validators.required],
      location: ['', Validators.required],
      date: ['', [Validators.required, this.dateValidator]],  
    });
  }

  ngOnInit(): void {
    this.fetchClubs();
  }

  fetchClubs(): void {
    this.clubService.getClubs().subscribe({
      next: (clubs) => {
        this.clubs = clubs;
      },
      error: (err) => {
        this.error = 'Error fetching clubs.';
      },
    });
  }

  onSubmit(): void {
    if (this.matchForm.invalid) {
      return;
    }

    const newMatch: IMatch = this.matchForm.value;

    this.loading = true;
    this.matchService.createMatch(newMatch).subscribe({
      next: () => {
        this.router.navigate(['/matches']);
      },
      error: (err) => {
        this.loading = false;
        this.error = 'Failed to create match. Please try again later.';
        console.error(err);
      },
    });
  }

  dateValidator(control: any): { [key: string]: boolean } | null {
    const selectedDate = new Date(control.value);
    const currentDate = new Date();
    if (selectedDate < currentDate) {
      return { 'invalidDate': true };
    }
    return null;
  }
}