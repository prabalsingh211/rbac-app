# RBAC

An RBAC Web App

Description: A Role-Based Access Control (RBAC) Angular application. The app allow an
admin to manage roles with page and feature-level permissions, assign it to users, and
enforce those permissions in the UI

Features:

• Authentication

- Dummy login with role : Admin
- Save logged-in user and role in service or localStorage.
- Use AuthGuard for route protection.
  • Role Management (Admin Only)
- CRUD for roles (in-memory or local storage).
- Assign permissions to each role:
- - Pages: Dashboard, Users
- - Features: Add User, Edit User, Delete User
    • User Management
- List of users with their assigned roles.
- Admin can:
- - Add/edit/delete users.
- - Assign role to user.
- Only show Edit/Delete buttons based on feature permission.
  • RBAC Enforcement
- Route Guard: Restrict access to routes based on role.
- Directive: Show/hide buttons based on feature permissions.
  • Pages
- /login
- /dashboard
- /users
- /roles

Tech & Architecture:
• Angular Material or SCSS for UI
• Reactive Forms
• Custom directive
• Standalone Components
• Use services for data handling (can use mock/dummy data)
• Modular folder structure
• Toast notifications (e.g., success on save)
• Search/filter on user list
• Pagination

Additional RBAC Rules & User Creation Notes:
By default, an Admin role exists in the system, which has unrestricted access to all pages
and features in the application.
Other roles (like Employee, Manager, etc.) must be manually created by the Admin, with
specific page-level and feature-level permissions.
When a new user is added, the Admin must:

- Assign a role to the user.
- Set an initial password for login (mandatory).
  A newly added user will only have access to the pages and features defined in their assigned
  role.
  All feature access and UI visibility (like Add/Edit/Delete buttons) must be enforced strictly
  via route guards and permission directives based on the user’s role.
