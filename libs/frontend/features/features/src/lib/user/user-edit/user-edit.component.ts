import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'avans-nx-workshop-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  editForm: FormGroup;
  userId!: string;
  loading = false; 

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.editForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], 
      profileImgUrl: [''],
      role: [''],
      gender: [''],
    });
  }

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('_id') || '';
    
    this.loading = true;
    
    this.userService.getUserById(this.userId).subscribe({
      next: (user) => {
        this.editForm.patchValue({
          username: user.username,
          email: user.email,
          profileImgUrl: user.profileImgUrl,
          role: user.role,
          gender: user.gender,
        });
        this.loading = false; 
      },
      error: (err) => {
        console.error('Error loading user:', err);
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }
    
    const formValue = { ...this.editForm.value };

    if (!formValue.password || formValue.password.trim() === '') {
      delete formValue.password;
    }

    this.userService.updateUser(this.userId, formValue).subscribe({
      next: (updatedUser) => {
        console.log('User updated:', updatedUser);
        this.router.navigate(['/userlist']); 
      },
      error: (error) => {
        console.error('User update error:', error);
      },
    });
  }
}