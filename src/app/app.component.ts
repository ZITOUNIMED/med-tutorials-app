import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  links: string[] = [];
  selectedComponent: { componentkey: string; content: any };

  onSubmit(component) {
    this.selectedComponent = component;
  }
}
