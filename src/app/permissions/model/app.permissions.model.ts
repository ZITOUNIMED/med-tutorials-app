import { ConfidentialityTypes } from "./confidentiality-types";
import { AppTargetTypes } from "./app.target-types";
import { UserRoleTypes } from "./user-role-types";

export interface AppPermissions {
  targetType: AppTargetTypes;
  confidentialities?: ConfidentialityTypes[];
  roles?: UserRoleTypes[];
  targetObject?: any;
}
