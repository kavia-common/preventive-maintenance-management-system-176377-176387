import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

// PUBLIC_INTERFACE
@Injectable({ providedIn: 'root' })
export class ApiService {
  /** This is the public API service for backend interactions. */
  private http = inject(HttpClient);
  private base = environment.apiBaseUrl;

  private buildParams(obj: Record<string, string | number | boolean | undefined>): HttpParams {
    let params = new HttpParams();
    Object.entries(obj).forEach(([k, v]) => {
      if (v !== undefined && v !== null && v !== '') {
        params = params.set(k, String(v));
      }
    });
    return params;
  }

  // Assets
  // PUBLIC_INTERFACE
  listAssets(q?: string): Observable<any[]> {
    const params = this.buildParams({ q });
    return this.http.get<any[]>(`${this.base}/assets`, { params });
  }
  // PUBLIC_INTERFACE
  getAsset(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/assets/${id}`);
  }
  // PUBLIC_INTERFACE
  createAsset(data: any): Observable<any> {
    return this.http.post<any>(`${this.base}/assets`, data);
  }
  // PUBLIC_INTERFACE
  updateAsset(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.base}/assets/${id}`, data);
  }
  // PUBLIC_INTERFACE
  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/assets/${id}`);
  }

  // Tasks
  // PUBLIC_INTERFACE
  listTasks(filter: { status?: string; assetId?: number } = {}): Observable<any[]> {
    const params = this.buildParams({ status: filter.status ?? undefined, assetId: filter.assetId });
    return this.http.get<any[]>(`${this.base}/tasks`, { params });
  }
  // PUBLIC_INTERFACE
  getTask(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/tasks/${id}`);
  }
  // PUBLIC_INTERFACE
  createTask(data: any): Observable<any> {
    return this.http.post<any>(`${this.base}/tasks`, data);
  }
  // PUBLIC_INTERFACE
  updateTask(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.base}/tasks/${id}`, data);
  }
  // PUBLIC_INTERFACE
  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/tasks/${id}`);
  }

  // Schedules
  // PUBLIC_INTERFACE
  listSchedules(filter: { assetId?: number } = {}): Observable<any[]> {
    const params = this.buildParams({ assetId: filter.assetId });
    return this.http.get<any[]>(`${this.base}/schedules`, { params });
  }
  // PUBLIC_INTERFACE
  getSchedule(id: number): Observable<any> {
    return this.http.get<any>(`${this.base}/schedules/${id}`);
  }
  // PUBLIC_INTERFACE
  createSchedule(data: any): Observable<any> {
    return this.http.post<any>(`${this.base}/schedules`, data);
  }
  // PUBLIC_INTERFACE
  updateSchedule(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.base}/schedules/${id}`, data);
  }
  // PUBLIC_INTERFACE
  deleteSchedule(id: number): Observable<void> {
    return this.http.delete<void>(`${this.base}/schedules/${id}`);
  }

  // PUBLIC_INTERFACE
  confirm(message: string): boolean {
    /** Wrapper to avoid no-undef in server-side/lint, uses globalThis */
    return typeof globalThis !== 'undefined' && typeof (globalThis as any).confirm === 'function'
      ? (globalThis as any).confirm(message)
      : true;
  }
}
