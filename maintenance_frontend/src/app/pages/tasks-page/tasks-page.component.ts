import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wrap">
    <div class="panel">
      <div class="panel-header">
        <h2>Tasks</h2>
        <div class="actions">
          <select [(ngModel)]="filter.status" (change)="load()">
            <option value="">All Status</option>
            <option>pending</option>
            <option>in_progress</option>
            <option>completed</option>
            <option>archived</option>
          </select>
        </div>
      </div>
      <table class="table">
        <thead><tr><th>ID</th><th>Title</th><th>Asset</th><th>Status</th><th>Priority</th><th>Due</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let t of tasks">
            <td>{{t.id}}</td>
            <td>{{t.title}}</td>
            <td>{{t.assetId}}</td>
            <td>{{t.status}}</td>
            <td>{{t.priority}}</td>
            <td>{{t.dueDate | date:'yyyy-MM-dd'}}</td>
            <td><button class="btn" (click)="edit(t)">Edit</button> <button class="btn danger" (click)="remove(t)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <div class="panel-header"><h2>{{form.id ? 'Edit' : 'Create'}} Task</h2></div>
      <form (ngSubmit)="save()" #f="ngForm" class="form">
        <label>Title<input name="title" [(ngModel)]="form.title" required /></label>
        <label>Description<textarea name="description" [(ngModel)]="form.description"></textarea></label>
        <label>Asset ID<input type="number" name="assetId" [(ngModel)]="form.assetId" required /></label>
        <label>Assigned To (User Id)<input type="number" name="assignedTo" [(ngModel)]="form.assignedTo" /></label>
        <label>Status
          <select name="status" [(ngModel)]="form.status">
            <option>pending</option><option>in_progress</option><option>completed</option><option>archived</option>
          </select>
        </label>
        <label>Priority
          <select name="priority" [(ngModel)]="form.priority">
            <option>low</option><option>medium</option><option>high</option><option>critical</option>
          </select>
        </label>
        <label>Due Date<input type="date" name="dueDate" [(ngModel)]="form.dueDate" /></label>
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
    .actions select{padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px}
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
export class TasksPageComponent implements OnInit {
  private api = inject(ApiService);
  tasks: any[] = [];
  filter: any = { status: '' };
  form: any = { title: '', description: '', assetId: null, assignedTo: null, status: 'pending', priority: 'medium', dueDate: null };

  ngOnInit(): void { this.load(); }

  load(){
    this.api.listTasks(this.filter).subscribe(d => this.tasks = d);
  }

  edit(t: any){ this.form = { ...t }; if (this.form.dueDate) this.form.dueDate = this.form.dueDate.substring(0,10); }

  reset(){ this.form = { title: '', description: '', assetId: null, assignedTo: null, status: 'pending', priority: 'medium', dueDate: null }; }

  save(){
    const payload = { ...this.form, assetId: Number(this.form.assetId) };
    if(this.form.id){
      this.api.updateTask(this.form.id, payload).subscribe(()=>{ this.reset(); this.load(); });
    }else{
      this.api.createTask(payload).subscribe(()=>{ this.reset(); this.load(); });
    }
  }

  remove(t:any){
    if (this.api.confirm('Delete task?')) {
      this.api.deleteTask(t.id).subscribe(()=> this.load());
    }
  }
}
