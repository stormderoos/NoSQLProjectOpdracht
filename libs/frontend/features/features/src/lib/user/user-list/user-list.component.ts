import { Component, OnInit } from "@angular/core";
import { User, UserService } from "../user.service";
import { AuthService } from "../../auth.service";

@Component({
    selector: 'avans-nx-workshop-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
    users: User[] = [];
    loading = true; 
    userRole: string | null = null;
    
    constructor(private userService: UserService, private authService : AuthService) {}
  
    ngOnInit(): void {
      this.userRole = this.authService.getUserRole();
      this.userService.getUsers().subscribe({
        next: (data) => {
          console.log('Users:', data);  
          this.users = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error fetching users:', err);
          this.loading = false;
        }
      });
    }
}