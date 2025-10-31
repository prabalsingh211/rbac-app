import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Role } from "../../../models/role.model";
import { ALL_PERMISSIONS } from "../../../models/permission.model";
import { RoleService } from "../../../core/services/role.service";

@Component({
  selector: "app-role-form",
  templateUrl: "./role-form.component.html",
  styleUrl: "./role-form.component.scss",
  standalone: false,
})
export class RoleFormComponent implements OnInit {
  roleForm: FormGroup;
  pagePermissions = ALL_PERMISSIONS.filter((p) => p.type === "page");
  featurePermissions = ALL_PERMISSIONS.filter((p) => p.type === "feature");
  selectedPermissions: Set<string> = new Set();

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RoleFormComponent>,
    private roleService: RoleService,
    @Inject(MAT_DIALOG_DATA) public data: { role?: Role }
  ) {
    this.roleForm = this.fb.group({
      name: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.data.role) {
      this.roleForm.patchValue({
        name: this.data.role.name,
      });
      this.data.role.permissions.forEach((permission) => {
        this.selectedPermissions.add(permission);
      });
    }
  }

  isPermissionSelected(permission: string): boolean {
    return this.selectedPermissions.has(permission);
  }
  onCheckboxChange(permission: string, event: Event): void {
    const isChecked = (event.target as HTMLInputElement)?.checked;
    this.onPermissionChange(permission, isChecked);
  }
  onPermissionChange(permission: string, isChecked: boolean): void {
    if (isChecked) {
      this.selectedPermissions.add(permission);
    } else {
      this.selectedPermissions.delete(permission);
    }
  }

  onSubmit(): void {
    if (this.roleForm.valid && this.selectedPermissions.size > 0) {
      const roleData = {
        name: this.roleForm.value.name,
        permissions: Array.from(this.selectedPermissions),
        isDefault: false,
      };

      if (this.data.role) {
        // Update existing role
        this.roleService.updateRole(this.data.role.id, roleData);
      } else {
        // Create new role
        this.roleService.createRole(roleData);
      }

      this.dialogRef.close(true); // Close with success
    } else {
      // Show validation message
      console.warn("Form is invalid or no permissions selected");
      // You can add a snackbar or alert here
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
