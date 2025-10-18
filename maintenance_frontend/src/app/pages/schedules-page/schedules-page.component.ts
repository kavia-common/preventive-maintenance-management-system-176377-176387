import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-schedules-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wrap">
    <div class="panel">
      <div class="panel-header"><h2>Schedules</h2></div>
      <table class="table">
        <thead><tr><th>ID</th><th>Asset</th><th>Frequency</th><th>Next Run</th><th>Last Run</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let s of schedules">
            <td>{{s.id}}</td>
            <td>{{s.assetId}}</td>
            <td>{{s.frequency}}</td>
            <td>{{s.nextRun | date:'yyyy-MM-dd'}}</td>
            <td>{{s.lastRun | date:'yyyy-MM-dd'}}</td>
            <td><button class="btn" (click)="edit(s)">Edit</button> <button class="btn danger" (click)="remove(s)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <div class="panel-header"><h2>{{form.id ? 'Edit' : 'Create'}} Schedule</h2></div>
      <form (ngSubmit)="save()" class="form">
        <label>Asset ID<input type="number" [(ngModel)]="form.assetId" name="assetId" required /></label>
        <label>Frequency
          <select [(ngModel)]="form.frequency" name="frequency">
            <option>daily</option><option>weekly</option><option>monthly</option><option>quarterly</option><option>yearly</option><option>custom</option>
          </select>
        </label>
        <label>Next Run<input type="date" [(ngModel)]="form.nextRun" name="nextRun" required /></label>
        <label>Last Run<input type="date" [(ngModel)]="form.lastRun" name="lastRun" /></label>
        <label>Notes<textarea [(ngModel)]="form.notes" name="notes"></textarea></label>
        <div class="row">
          <button class="btn primary" type="submit">{{form.id ? 'Update' : 'Create'}}</button>
          <button class="btn" type="button" (click)="reset()">Clear</button>
        </div>
      </form>
    </div>
  </div>
  `,
  styles:[`
    .wrap{display:grid;grid-template-columns:2fr 1fr;gap:16px}
    .panel{background:#fff;border:1px solid #e5e7eb;border-radius:12px;box-shadow:0 1px 2px rgba(0,0,0,.04);padding:16px}
    .panel-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:10px}
    .table{width:100%;border-collapse:collapse}
    .table th,.table td{border-bottom:1px solid #f3f4f6;padding:8px;text-align:left}
    .btn{padding:6px 10px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer}
    .btn.primary{background:#7C3AED;color:#fff;border-color:#7C3AED}
    .btn.danger{background:#EF4444;color:#fff;border-color:#EF4444}
    .form{display:flex;flex-direction:column;gap:8px}
    .form label{display:flex;flex-direction:column;gap:6px}
    .form input,.form textarea,.form select{padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px}
    .row{display:flex;gap:8px;margin-top:8px}
    @media (max-width: 1000px){.wrap{grid-template-columns:1fr}}
  `]
})
export class SchedulesPageComponent implements OnInit {
  private api = inject(ApiService);
  schedules: any[] = [];
  form: any = { assetId: null, frequency: 'monthly', nextRun: null, lastRun: null, notes: '' };

  ngOnInit(): void { this.load(); }

  load(){ this.api.listSchedules().subscribe(d => this.schedules = d); }

  edit(s:any){
    this.form = { ...s };
    if (this.form.nextRun) this.form.nextRun = this.form.nextRun.substring(0,10);
    if (this.form.lastRun) this.form.lastRun = this.form.lastRun.substring(0,10);
  }

  reset(){ this.form = { assetId: null, frequency: 'monthly', nextRun: null, lastRun: null, notes: '' }; }

  save(){
    const payload = { ...this.form, assetId: Number(this.form.assetId) };
    if(this.form.id){
      this.api.updateSchedule(this.form.id, payload).subscribe(()=>{ this.reset(); this.load(); });
    }else{
      this.api.createSchedule(payload).subscribe(()=>{ this.reset(); this.load(); });
    }
  }

  remove(s:any){
    if (this.api.confirm('Delete schedule?')) {
      this.api.deleteSchedule(s.id).subscribe(()=> this.load());
    }
  }
}
