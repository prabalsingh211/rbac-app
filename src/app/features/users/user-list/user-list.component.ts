import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { User } from "../../../models/user.model";
import { UserService } from "../../../core/services/user.service";
import { RoleService } from "../../../core/services/role.service";
import { UserFormComponent } from "../user-form/user-form.component";
import { PERMISSIONS } from "../../../models/permission.model";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrl: "./user-list.component.scss",
  standalone: false,
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = ["username", "email", "role", "actions"];
  dataSource = new MatTableDataSource<User>();
  readonly PERMISSIONS = PERMISSIONS;

  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.dataSource.data = this.userService.getUsers();
  }

  openUserForm(user?: User): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: "400px",
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadUsers();
      }
    });
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.userService.deleteUser(user.id);
      this.loadUsers();
    }
  }
}
