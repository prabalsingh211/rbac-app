import { Injectable } from "@angular/core";
import { Role } from "../../models/role.model";
import { PERMISSIONS } from "../../models/permission.model";

@Injectable({
  providedIn: "root",
})
export class RoleService {
  private rolesKey = "rbac_roles";

  constructor() {
    this.initializeDefaultRoles();
  }

  private initializeDefaultRoles(): void {
    const existingRoles = this.getRoles();
    if (existingRoles.length === 0) {
      const adminRole: Role = {
        id: "1",
        name: "Admin",
        permissions: [
          PERMISSIONS.PAGES.DASHBOARD,
          PERMISSIONS.PAGES.USERS,
          PERMISSIONS.PAGES.ROLES,
          PERMISSIONS.FEATURES.ADD_USER,
          PERMISSIONS.FEATURES.EDIT_USER,
          PERMISSIONS.FEATURES.DELETE_USER,
        ],
        isDefault: true,
      };
      this.saveRoles([adminRole]);
    }
  }

  getRoles(): Role[] {
    const rolesJson = localStorage.getItem(this.rolesKey);
    return rolesJson ? JSON.parse(rolesJson) : [];
  }

  getRoleById(id: string): Role | undefined {
    return this.getRoles().find((role) => role.id === id);
  }

  createRole(role: Omit<Role, "id">): Role {
    const roles = this.getRoles();
    const newRole: Role = {
      ...role,
      id: Date.now().toString(),
    };
    roles.push(newRole);
    this.saveRoles(roles);
    return newRole;
  }

  updateRole(id: string, updatedRole: Omit<Role, "id">): Role | null {
    const roles = this.getRoles();
    const index = roles.findIndex((role) => role.id === id);
    if (index !== -1) {
      roles[index] = { ...updatedRole, id };
      this.saveRoles(roles);
      return roles[index];
    }
    return null;
  }

  deleteRole(id: string): boolean {
    const roles = this.getRoles();
    const filteredRoles = roles.filter(
      (role) => role.id !== id && !role.isDefault
    );
    if (filteredRoles.length === roles.length) return false;

    this.saveRoles(filteredRoles);
    return true;
  }

  private saveRoles(roles: Role[]): void {
    localStorage.setItem(this.rolesKey, JSON.stringify(roles));
  }
}
