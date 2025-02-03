
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone  : true,
  imports: [CommonModule,ReactiveFormsModule ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMessage = 'Please correct the errors in the form.';
      return;
    }

    const credentials = this.loginForm.value;

    // this.authService.login(credentials).subscribe({
    //   next: (response) => {
    //     localStorage.setItem('token', response.token);
    //     this.router.navigate(['/dashboard']);
    //   },
    //   error: (error) => {
    //     this.errorMessage = 'Invalid credentials. Please try again.';
    //     console.error('Login error', error);
    //   }
    // });
  }
}
