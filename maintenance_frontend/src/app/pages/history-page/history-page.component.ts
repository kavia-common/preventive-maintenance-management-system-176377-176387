import { Component } from '@angular/core';

@Component({
  selector: 'app-history-page',
  standalone: true,
  template: `
  <div class="panel">
    <div class="panel-header"><h2>Task History</h2></div>
    <p>Read-only history view to be implemented. Data exists in backend table task_history.</p>
  </div>
  `,
  styles:[`
    .panel{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.04);padding:16px}
    .panel-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
  `]
})
export class HistoryPageComponent {}
