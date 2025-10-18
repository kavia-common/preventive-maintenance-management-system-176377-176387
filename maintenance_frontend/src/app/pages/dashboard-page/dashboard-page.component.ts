import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  template: `
  <div class="cards">
    <div class="card">
      <div class="card-title">Welcome</div>
      <div class="card-body">Use the sidebar to navigate Assets, Tasks, and Schedules.</div>
    </div>
    <div class="card">
      <div class="card-title">Getting Started</div>
      <div class="card-body">Create assets and tasks. The list pages show sample data from the backend.</div>
    </div>
  </div>
  `,
  styles: [`
    .cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}
    .card{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.04);padding:16px}
    .card-title{font-weight:600;margin-bottom:8px}
  `]
})
export class DashboardPageComponent { }
