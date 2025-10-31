import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { Role } from "../../../models/role.model";
import { RoleService } from "../../../core/services/role.service";
import { RoleFormComponent } from "../role-form/role-form.component";

@Component({
  selector: "app-role-list",
  templateUrl: "./role-list.component.html",
  styleUrl: "./role-list.component.scss",
  standalone: false,
})
export class RoleListComponent implements OnInit {
  displayedColumns: string[] = ["name", "permissions", "actions"];
  dataSource = new MatTableDataSource<Role>();

  constructor(private roleService: RoleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.dataSource.data = this.roleService.getRoles();
  }

  openRoleForm(role?: Role): void {
    const dialogRef = this.dialog.open(RoleFormComponent, {
      width: "500px",
      data: { role },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadRoles();
      }
    });
  }

  deleteRole(role: Role): void {
    if (confirm(`Are you sure you want to delete role ${role.name}?`)) {
      this.roleService.deleteRole(role.id);
      this.loadRoles();
    }
  }
}
