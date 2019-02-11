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
  MatDialogModule
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
  MatDialogModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialmodule {}
