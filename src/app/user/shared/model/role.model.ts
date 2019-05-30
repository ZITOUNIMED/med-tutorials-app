import { UserRoleTypes } from "src/app/permissions/model/user-role-types";

export interface Role {
    id: number;
    name: UserRoleTypes;
}
