import { Component } from "@angular/core";
import { AuthService } from "./core/services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.scss",
  standalone: false,
})
export class AppComponent {
  isAuthenticated = false;
  currentUser: any;

  constructor(private authService: AuthService) {
    this.authService.currentUser$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.currentUser = user;
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
