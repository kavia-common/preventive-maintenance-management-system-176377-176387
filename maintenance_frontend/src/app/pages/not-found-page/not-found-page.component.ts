import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  template: `
  <div class="panel">
    <h2>404 - Page not found</h2>
    <a routerLink="/" class="btn">Go Home</a>
  </div>
  `,
  styles:[`
    .panel{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.04);padding:16px}
    .btn{display:inline-block;margin-top:10px;padding:6px 10px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer;text-decoration:none}
  `]
})
export class NotFoundPageComponent {}
