import {NgModule} from "@angular/core";
import {NavBarComponent} from "./nav-bar/nav-bar.component";
import {ToolBarComponent} from "./tool-bar/tool-bar.component";
import {AppMaterialModule} from "../app.material.module";
import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";

@NgModule({
  imports: [AppMaterialModule, RouterModule, BrowserModule],
  declarations: [NavBarComponent, ToolBarComponent],
  exports: [NavBarComponent, ToolBarComponent]
})
export class AppMenuModule {}
