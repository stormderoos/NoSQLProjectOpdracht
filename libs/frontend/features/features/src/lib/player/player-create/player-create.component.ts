import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../player.service';
import { PlayerPosition } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-player-create',
  templateUrl: './player-create.component.html',
  styleUrls: ['./player-create.component.css'],
})
export class PlayerCreateComponent {
  playerForm: FormGroup;
  error: string | null = null;
  positions = Object.values(PlayerPosition).filter(
    (pos) => pos !== PlayerPosition.Unknown
  ); 
  defaultImage = '/assets/footballplayer.png';

  constructor(
    private fb: FormBuilder,
    private playerService: PlayerService,
    private router: Router
  ) {
    this.playerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
      birthdate: ['', Validators.required],
      profileImageUrl: [''] 
    });
  }

  onSubmit(): void {
    if (this.playerForm.invalid) return;
  
    const newPlayer = {
      ...this.playerForm.value,
      profileImageUrl: '/assets/footballplayer.png'
    };
  
    this.playerService.addPlayer(newPlayer).subscribe({
      next: () => this.router.navigate(['/players']),
      error: (err) => {
        this.error = 'Failed to create player. Please try again.';
        console.error(err);
      },
    });
  }
}