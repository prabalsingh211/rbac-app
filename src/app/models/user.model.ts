import { Role } from "./role.model";

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  roleId: string;
  role?: Role;
}
