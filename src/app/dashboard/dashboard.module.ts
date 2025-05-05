import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { DashboardRoutingModule } from "./dashboard-routing.module";
import { ProfileComponent } from "./profile/profile.component";
import { UsersComponent } from "./users/users.component";
import { ReportComponent } from './report/report.component';

@NgModule({
    declarations: [
      DashboardComponent,
      ProfileComponent,
      UsersComponent,
      ReportComponent
    ],
    imports: [
      CommonModule,
      DashboardRoutingModule
    ]
  })
  export class DashboardModule {}