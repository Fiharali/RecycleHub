// src/app/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [NavbarComponent, SidebarComponent,CommonModule, ReactiveFormsModule]
})
export class ProfileComponent implements OnInit {
  profileForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.profileForm = new FormGroup({
      email: new FormControl(currentUser.email, [Validators.required, Validators.email]),
      firstName: new FormControl(currentUser.firstName, [Validators.required]),
      lastName: new FormControl(currentUser.lastName, [Validators.required]),
      address: new FormControl(currentUser.address, [Validators.required]),
      phoneNumber: new FormControl(currentUser.phoneNumber, [Validators.required, Validators.pattern(/^\d{10}$/)]),
      dateOfBirth: new FormControl(currentUser.dateOfBirth, [Validators.required])
    });
  }

  onUpdate(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    const updatedUser = this.profileForm.value;

    this.authService.updateUser(updatedUser).subscribe({
      next: (response) => {
        this.successMessage = 'Profile updated successfully.';
        this.errorMessage = '';

        this.authService.storeUserInfo(response);
        alert('Profile updated successfully.');
      },
      error: (error) => {
        if (error.message === 'Failed to update user') {
          this.errorMessage = 'Failed to update your profile. Please try again.';
        } else {
          this.errorMessage = 'An error occurred. Please try again.';
        }
        console.error('Profile update error', error);
      }
    });
  }
}
