import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { User } from "../../../models/user.model";
import { Role } from "../../../models/role.model";
import { RoleService } from "../../../core/services/role.service";
import { UserService } from "../../../core/services/user.service";

@Component({
  selector: "app-user-form",
  templateUrl: "./user-form.component.html",
  styleUrl: "./user-form.component.scss",
  standalone: false,
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  roles: Role[] = [];

  constructor(
    private fb: FormBuilder,
    private roleService: RoleService,
    private userService: UserService,
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user?: User }
  ) {
    this.userForm = this.fb.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", this.data.user ? [] : Validators.required],
      roleId: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.roles = this.roleService.getRoles();

    if (this.data.user) {
      this.userForm.patchValue({
        username: this.data.user.username,
        email: this.data.user.email,
        roleId: this.data.user.roleId,
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      if (this.data.user) {
        // Update existing user
        const userData = {
          username: formValue.username,
          email: formValue.email,
          password: formValue.password || this.data.user.password,
          roleId: formValue.roleId,
        };
        this.userService.updateUser(this.data.user.id, userData);
      } else {
        // Create new user
        this.userService.createUser(formValue);
      }

      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}
