import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@avans-nx-workshop/frontend/features/features';
@Component({
  selector: 'avans-nx-workshop-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return !!currentUser;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}