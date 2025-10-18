import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { AssetsPageComponent } from './pages/assets-page/assets-page.component';
import { TasksPageComponent } from './pages/tasks-page/tasks-page.component';
import { SchedulesPageComponent } from './pages/schedules-page/schedules-page.component';
import { HistoryPageComponent } from './pages/history-page/history-page.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

export const routes: Routes = [
  { path: '', component: DashboardPageComponent, title: 'Dashboard' },
  { path: 'assets', component: AssetsPageComponent, title: 'Assets' },
  { path: 'tasks', component: TasksPageComponent, title: 'Tasks' },
  { path: 'schedules', component: SchedulesPageComponent, title: 'Schedules' },
  { path: 'history', component: HistoryPageComponent, title: 'History' },
  { path: '**', component: NotFoundPageComponent, title: 'Not Found' }
];
