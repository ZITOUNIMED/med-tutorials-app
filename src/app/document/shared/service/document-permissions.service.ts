import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AppPermissions } from "src/app/permissions/model/app.permissions.model";
import { AppStoreService } from "src/app/shared/service/app.store.service";
import { map } from "rxjs/operators";
import { isNotEmptyArray, oc } from "src/app/shared/app-utils";
import { ConfidentialityTypes } from "src/app/permissions/model/confidentiality-types";
import { VisibilityStates } from "src/app/permissions/model/visibility-states";
import { Document } from '../model/document.model';

@Injectable()
export class DocumentPermissionsService {

  constructor(private appStoreService: AppStoreService){}

  managePermissions(appPermissions: AppPermissions): Observable<VisibilityStates> {
    return this.appStoreService.getUser()
    .pipe(map(user => {
      let visibility = VisibilityStates.VISIBLE;
      if(oc(appPermissions).targetObject && user){
        const doc = appPermissions.targetObject as Document;
        if(isNotEmptyArray(oc(appPermissions).confidentialities) &&
          appPermissions.confidentialities.some(c => c === ConfidentialityTypes.PRIVATE)){
          visibility = VisibilityStates.HIDEN;
        } else if(doc.confidentiality === ConfidentialityTypes.PUBLIC && doc.ownerUsername !== user.username){
          visibility = VisibilityStates.HIDEN;
        }
      }
      return visibility;
    }));
  }

}
