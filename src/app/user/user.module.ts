import { NgModule } from "@angular/core";
import { UserPermissionsService } from "./shared/service/user-permissions.service";

@NgModule({
  providers: [UserPermissionsService]
})
export class UserModule {}
