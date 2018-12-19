import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { LinksComponent } from "./links/links.component";
import { ContentComponent } from "./content/content.component";
import { PaletteComponent } from "./palette/palette.component";
import { AppMaterialmodule } from "./app.material.module";
import { ComponentsContainerDirective } from './components-container.directive';

@NgModule({
  declarations: [
    AppComponent,
    LinksComponent,
    ContentComponent,
    PaletteComponent,
    ComponentsContainerDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppMaterialmodule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
