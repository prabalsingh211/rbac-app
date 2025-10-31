import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { User } from "../../models/user.model";
import { RoleService } from "./role.service";
import { UserService } from "./user.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private router: Router,
    private roleService: RoleService,
    private userService: UserService
  ) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userData = localStorage.getItem("currentUser");
    if (userData) {
      const user = JSON.parse(userData);
      const role = this.roleService.getRoleById(user.roleId);
      this.currentUserSubject.next({ ...user, role });
    }
  }

  login(username: string, password: string): boolean {
    const user = this.userService.authenticate(username, password);
    if (user) {
      const role = this.roleService.getRoleById(user.roleId);
      const userWithRole = { ...user, role };
      localStorage.setItem("currentUser", JSON.stringify(userWithRole));
      this.currentUserSubject.next(userWithRole);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem("currentUser");
    this.currentUserSubject.next(null);
    this.router.navigate(["/login"]);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  hasPermission(permission: string): boolean {
    const user = this.getCurrentUser();
    if (!user || !user.role) return false;

    // Admin has all permissions
    if (user.role.name === "Admin") return true;

    return user.role.permissions.includes(permission);
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
}
