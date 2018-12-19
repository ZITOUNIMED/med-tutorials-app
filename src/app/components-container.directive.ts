import {
  Directive,
  ElementRef,
  OnChanges,
  Input,
  SimpleChanges,
  Renderer2
} from "@angular/core";

import { ElementsBuilderService } from "./services/elements-builder.service";

@Directive({
  selector: "[appComponentsContainer]"
})
export class ComponentsContainerDirective implements OnChanges {
  @Input() newComponent: { componentkey: string; content: any };

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private elementsBuilderService: ElementsBuilderService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    let child = null;
    if (this.newComponent && this.newComponent.componentkey === "source-code") {
      child = this.elementsBuilderService.buildTextArea(
        this.newComponent.content
      );
      this.renderer.appendChild(this.elementRef.nativeElement, child);
    } else if (this.newComponent && this.newComponent.componentkey === "text") {
      child = this.elementsBuilderService.buildText(this.newComponent.content);
      this.renderer.appendChild(this.elementRef.nativeElement, child);
    }
    this.renderer.appendChild(
      this.elementRef.nativeElement,
      document.createElement("br")
    );
  }
}
