export interface Permission {
  id: string;
  name: string;
  type: "page" | "feature";
}

export const PERMISSIONS = {
  PAGES: {
    DASHBOARD: "dashboard",
    USERS: "users",
    ROLES: "roles",
  },
  FEATURES: {
    ADD_USER: "add_user",
    EDIT_USER: "edit_user",
    DELETE_USER: "delete_user",
  },
} as const;

export const ALL_PERMISSIONS = [
  { id: "dashboard", name: "Dashboard", type: "page" as const },
  { id: "users", name: "Users", type: "page" as const },
  { id: "roles", name: "Roles", type: "page" as const },
  { id: "add_user", name: "Add User", type: "feature" as const },
  { id: "edit_user", name: "Edit User", type: "feature" as const },
  { id: "delete_user", name: "Delete User", type: "feature" as const },
];
