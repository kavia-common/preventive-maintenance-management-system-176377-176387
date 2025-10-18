import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-assets-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
  <div class="wrap">
    <div class="panel">
      <div class="panel-header">
        <h2>Assets</h2>
        <div class="actions">
          <input [(ngModel)]="q" placeholder="Search..." (input)="load()" />
        </div>
      </div>
      <table class="table">
        <thead><tr><th>ID</th><th>Name</th><th>Code</th><th>Location</th><th></th></tr></thead>
        <tbody>
          <tr *ngFor="let a of assets">
            <td>{{a.id}}</td>
            <td>{{a.name}}</td>
            <td>{{a.code}}</td>
            <td>{{a.location}}</td>
            <td><button class="btn" (click)="edit(a)">Edit</button> <button class="btn danger" (click)="remove(a)">Delete</button></td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="panel">
      <div class="panel-header"><h2>{{form.id ? 'Edit' : 'Create'}} Asset</h2></div>
      <form (ngSubmit)="save()" #f="ngForm" class="form">
        <label>Name<input name="name" [(ngModel)]="form.name" required /></label>
        <label>Code<input name="code" [(ngModel)]="form.code" required /></label>
        <label>Location<input name="location" [(ngModel)]="form.location" /></label>
        <label>Description<textarea name="description" [(ngModel)]="form.description"></textarea></label>
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
    .actions input{padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px}
    .table{width:100%;border-collapse:collapse}
    .table th,.table td{border-bottom:1px solid #f3f4f6;padding:8px;text-align:left}
    .btn{padding:6px 10px;border-radius:8px;border:1px solid #e5e7eb;background:#fff;cursor:pointer}
    .btn.primary{background:#7C3AED;color:#fff;border-color:#7C3AED}
    .btn.danger{background:#EF4444;color:#fff;border-color:#EF4444}
    .form{display:flex;flex-direction:column;gap:8px}
    .form label{display:flex;flex-direction:column;gap:6px}
    .form input,.form textarea{padding:8px 10px;border:1px solid #e5e7eb;border-radius:8px}
    .row{display:flex;gap:8px;margin-top:8px}
    @media (max-width: 1000px){.wrap{grid-template-columns:1fr}}
  `]
})
export class AssetsPageComponent implements OnInit {
  private api = inject(ApiService);
  assets: any[] = [];
  q = '';
  form: any = { name: '', code: '', location: '', description: '' };

  ngOnInit(): void { this.load(); }

  load(){
    this.api.listAssets(this.q).subscribe(d => this.assets = d);
  }

  edit(a: any){ this.form = { ...a }; }

  reset(){ this.form = { name: '', code: '', location: '', description: '' }; }

  save(){
    if(this.form.id){
      this.api.updateAsset(this.form.id, this.form).subscribe(()=>{ this.reset(); this.load(); });
    }else{
      this.api.createAsset(this.form).subscribe(()=>{ this.reset(); this.load(); });
    }
  }

  remove(a:any){
    if (this.api.confirm('Delete asset?')) {
      this.api.deleteAsset(a.id).subscribe(()=> this.load());
    }
  }
}
