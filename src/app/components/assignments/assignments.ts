import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'app-assignments',
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
  imports: [CommonModule, FormsModule]
})
export class Assignments implements OnInit {
  user: any = null;
  assignments: any[] = [];
  newTitle: string = '';
  newDescription: string = '';
  newDueDate: string = '';
  creating: boolean = false;
  searchTerm: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private zone: NgZone
  ) {}

ngOnInit() {
  const stored = localStorage.getItem('user');
  if (stored) {
    this.user = JSON.parse(stored);
  } else {
    this.router.navigate(['/login']);
    return;
  }

  this.http.get<any[]>('https://assignment-portal-backend-zyn8.onrender.com/assignments?t=' + Date.now())
    .subscribe({
      next: (data) => {
        this.assignments = data;
      },
      error: (err) => {
        console.log('error:', err);
      }
    });
}
  createAssignment() {
    this.creating = true;
    const body = {
      title: this.newTitle,
      description: this.newDescription,
      dueDate: this.newDueDate,
      createdBy: this.user._id
    };
    this.http.post('https://assignment-portal-backend-zyn8.onrender.com/assignments', body)
      .subscribe({ next: () => {}, error: () => {} });
    setTimeout(() => { window.location.reload(); }, 2000);
  }

  deleteAssignment(id: string) {
    this.http.delete('https://assignment-portal-backend-zyn8.onrender.com/assignments/' + id)
      .subscribe({ next: () => {}, error: () => {} });
    setTimeout(() => { window.location.reload(); }, 1000);
  }

  goToSubmit(assignmentId: string) {
    this.router.navigate(['/submit'], { queryParams: { id: assignmentId } });
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}