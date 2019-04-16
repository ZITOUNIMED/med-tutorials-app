import { NgModule } from '@angular/core';
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
  MatAutocompleteModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
} from '@angular/material';

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
  MatAutocompleteModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class AppMaterialModule {}
