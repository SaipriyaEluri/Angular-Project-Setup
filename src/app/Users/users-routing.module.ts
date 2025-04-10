import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "../Auth.guard";
import { UsersLayout } from './users-layout.component';
import { UsersListComponent } from './Users-List/users-list.component';


const routes: Routes = [
  {
    path: '', component: UsersLayout, canActivateChild: [AuthGuard],
    children: [
      { path: '', redirectTo: '/users-list', pathMatch: 'full' },
      { path: 'users-list', component: UsersListComponent, canActivate: [AuthGuard]  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class UsersRoutingModule { }
