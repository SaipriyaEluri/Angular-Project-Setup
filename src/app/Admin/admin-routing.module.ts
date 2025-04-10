import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayout } from "./admin-layout.component";
import { AuthGuard } from "../Auth.guard";
import { FtpListComponent } from './FTP-List/ftp-list.component';
import { SchedulersComponent } from './Schedulers/schedulers.component';

const routes: Routes = [
  {
    path: '', component: AdminLayout, 
    children: [
      { path: '', redirectTo: '/ftp-list', pathMatch: 'full' },
      { path: 'ftp-list', component: FtpListComponent,   },
      { path: 'schedulers', component: SchedulersComponent,}      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})

export class AdminRoutingModule { }