import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { RoleGuard } from "./core/guards/role.guard";
import { PERMISSIONS } from "./models/permission.model";
import { LoginComponent } from "./features/auth/login/login.component";
import { DashboardComponent } from "./features/dashboard/dashboard.component";

const routes: Routes = [
  { path: "", redirectTo: "/dashboard", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  {
    path: "dashboard",
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { permission: PERMISSIONS.PAGES.DASHBOARD },
  },
  {
    path: "users",
    loadChildren: () =>
      import("./features/users/users.module").then((m) => m.UsersModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: PERMISSIONS.PAGES.USERS },
  },
  {
    path: "roles",
    loadChildren: () =>
      import("./features/roles/roles.module").then((m) => m.RolesModule),
    canActivate: [AuthGuard, RoleGuard],
    data: { permission: PERMISSIONS.PAGES.ROLES },
  },
  { path: "**", redirectTo: "/dashboard" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
