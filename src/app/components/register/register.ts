import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.css',
  imports: [FormsModule, RouterLink, CommonModule]
})
export class Register {
  name: string = '';
  email: string = '';
  password: string = '';
  role: string = 'student';
  loading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  onRegister() {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const body = {
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role
    };

    this.http.post('https://assignment-portal-backend-zyn8.onrender.com/users/register', body)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          this.successMessage = 'Registered successfully! Redirecting...';
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = err.error?.message || 'Registration failed. Try again.';
        }
      });
  }
}