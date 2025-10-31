import { Injectable } from "@angular/core";
import { User } from "../../models/user.model";
import { RoleService } from "./role.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersKey = "rbac_users";

  constructor(private roleService: RoleService) {
    this.initializeDefaultUser();
  }

  private initializeDefaultUser(): void {
    const existingUsers = this.getUsers();
    if (existingUsers.length === 0) {
      const adminUser: User = {
        id: "1",
        username: "admin",
        email: "admin@example.com",
        password: "admin123",
        roleId: "1", // Admin role
      };
      this.saveUsers([adminUser]);
    }
  }

  getUsers(): User[] {
    const usersJson = localStorage.getItem(this.usersKey);
    const users: User[] = usersJson ? JSON.parse(usersJson) : [];

    // Enhance users with role data
    return users.map((user) => ({
      ...user,
      role: this.roleService.getRoleById(user.roleId),
    }));
  }

  getUserById(id: string): User | undefined {
    return this.getUsers().find((user) => user.id === id);
  }

  createUser(userData: Omit<User, "id">): User {
    const users = this.getUsers();
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
    };
    users.push(newUser);
    this.saveUsers(users.map((u) => ({ ...u, role: undefined }))); // Remove role before saving
    return newUser;
  }

  updateUser(id: string, userData: Omit<User, "id">): User | null {
    const users = this.getUsers();
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...userData, id };
      this.saveUsers(users.map((u) => ({ ...u, role: undefined }))); // Remove role before saving
      return users[index];
    }
    return null;
  }

  deleteUser(id: string): boolean {
    const users = this.getUsers();
    const filteredUsers = users.filter(
      (user) => user.id !== id && user.username !== "admin"
    );
    if (filteredUsers.length === users.length) return false;

    this.saveUsers(filteredUsers.map((u) => ({ ...u, role: undefined }))); // Remove role before saving
    return true;
  }

  authenticate(username: string, password: string): User | null {
    const users = this.getUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    return user || null;
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(this.usersKey, JSON.stringify(users));
  }
}
