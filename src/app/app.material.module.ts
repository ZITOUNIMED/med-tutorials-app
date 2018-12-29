import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatIconModule,
  MatChipsModule,
  MatProgressSpinnerModule
} from "@angular/material";

const modules = [
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatIconModule,
  MatChipsModule,
  MatProgressSpinnerModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialmodule {}
