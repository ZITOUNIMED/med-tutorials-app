import { NgModule } from "@angular/core";
import {
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
  MatButtonModule
} from "@angular/material";

@NgModule({
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class AppMaterialmodule {}
