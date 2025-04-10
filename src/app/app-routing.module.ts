import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  // { path: 'RefreshComponent', component:RefreshComponent},
  { path: 'auth', loadChildren: () => import('./AuthLayout/auth-layout.module').then(m => m.AuthLayoutModule) },
  { path: 'admin', loadChildren: () => import('./Admin/admin.module').then(m => m.AdminModule) },
  { path: 'user',loadChildren: () => import('./Users/users-layout.module').then(m => m.UserLayoutModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
