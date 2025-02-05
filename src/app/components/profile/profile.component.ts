// src/app/components/profile/profile.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NavbarComponent } from "../../layout/navbar/navbar.component";
import { SidebarComponent } from "../../layout/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { User } from '../../models/user.mode';

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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.profileForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      dateOfBirth: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        if (!user) {
          this.router.navigate(['/login']);
          return;
        }
        this.updateFormWithUserData(user);
      },
      error: (error) => {
        console.error('Error fetching user data:', error);
        this.errorMessage = 'Error loading user data. Please try again later.';
        this.router.navigate(['/login']);
      }
    });
  }

  private updateFormWithUserData(user: User): void {
    this.profileForm.patchValue({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phoneNumber,
      dateOfBirth: user.dateOfBirth,
      password: user.password
    });
  }
  private initializeForm(user: User): void {
    this.profileForm = new FormGroup({
      email: new FormControl(user.email, [Validators.required, Validators.email]),
      firstName: new FormControl(user.firstName, [Validators.required]),
      lastName: new FormControl(user.lastName, [Validators.required]),
      address: new FormControl(user.address, [Validators.required]),
      phoneNumber: new FormControl(user.phoneNumber, [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]),
      dateOfBirth: new FormControl(user.dateOfBirth, [Validators.required]),
      password: new FormControl(user.password, [Validators.required])
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

        Swal.fire({
          title: 'Success',
          text: 'Profile updated successfully.',
          icon: 'success',
        });
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
