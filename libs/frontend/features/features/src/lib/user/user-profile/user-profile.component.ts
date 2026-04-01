import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { IUserIdentity } from '@avans-nx-workshop/shared/api';

@Component({
  selector: 'avans-nx-workshop-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: IUserIdentity | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
  }
}