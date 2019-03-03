import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule,
  MatAutocompleteModule
} from "@angular/material";

const modules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatChipsModule,
  MatDialogModule,
  MatAutocompleteModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialmodule {}
