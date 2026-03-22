import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-submit',
  templateUrl: './submit.html',
  styleUrl: './submit.css',
  imports: [CommonModule]
})
export class Submit implements OnInit {
  selectedFile: File | null = null;
  assignmentId: string = '';
  user: any = null;
  submitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const stored = localStorage.getItem('user');
    if (stored) {
      this.user = JSON.parse(stored);
    } else {
      this.router.navigate(['/login']);
    }

    this.route.queryParams.subscribe(params => {
      this.assignmentId = params['id'];
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  submitAssignment() {
  if (!this.selectedFile) return;
  this.submitting = true;

  const formData = new FormData();
  formData.append('file', this.selectedFile);
  formData.append('assignment', this.assignmentId);
  formData.append('student', this.user._id);

  this.http.post('https://assignment-portal-backend-zyn8.onrender.com/submissions', formData)
    .subscribe({ next: () => {}, error: () => {} });

  setTimeout(() => {
    this.successMessage = 'Assignment submitted successfully!';
    setTimeout(() => {
      this.router.navigate(['/assignments']);
    }, 1500);
  }, 2000);
}
  goBack() {
    this.router.navigate(['/assignments']);
  }
}