import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.css',
  // FormsModule   — needed for [(ngModel)] to work
  // CommonModule  — needed for *ngIf, *ngFor directives
  imports: [FormsModule, RouterLink, CommonModule]
})
export class Login {

  email: string = '';
  password: string = '';

  //disables button while request is running
  loading: boolean = false;
  errorMessage: string = '';


  constructor(private router: Router, private http: HttpClient) {}

  onLogin() {
    this.loading = true;
    this.errorMessage = '';

    // data that is sent to the backend
    const body = {
      email: this.email,
      password: this.password
    };

    // .subscribe() is how we handle the response in Angular
    // It takes two callbacks:
    // First  = runs if request succeeds
    // Second = runs if request fails
    this.http.post('https://assignment-portal-backend-zyn8.onrender.com/users/login', body)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          // Save user info to localStorage so other pages can access it
          localStorage.setItem('user', JSON.stringify(response.user));
          // Navigate to assignments page after successful login
          this.router.navigate(['/assignments']);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Login failed. Try again.';
        }
      });
  }
}