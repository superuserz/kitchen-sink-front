import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { authGuard } from "../shared/guards/auth.guard";

const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      canActivateChild: [authGuard],
      children: [
        { path: 'profile', component: ProfileComponent },
        { path: 'users', component: UsersComponent }, // Can be protected with AdminGuard
        { path: '', redirectTo: 'profile', pathMatch: 'full' }
      ]
    }
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class DashboardRoutingModule {}