import { Routes } from '@angular/router';
import { CamerasComponent } from './features/cameras/cameras.component';

export const routes: Routes = [
  { path: 'cameras', component: CamerasComponent },
  { path: '', redirectTo: '/cameras', pathMatch: 'full' },
];
