import { Directive, TemplateRef, ViewContainerRef, Input } from "@angular/core";
import { AuthService } from "../../core/services/auth.service";

@Directive({
  selector: "[appHasPermission]",
  standalone: false,
})
export class HasPermissionDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

  @Input() set appHasPermission(permission: string) {
    if (this.authService.hasPermission(permission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
