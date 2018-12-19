import { Injectable, Inject } from "@angular/core";
import { DOCUMENT } from "@angular/common";

@Injectable({
  providedIn: "root"
})
export class ElementsBuilderService {
  constructor(@Inject(DOCUMENT) private document) {}

  buildTextArea(content: string) {
    const textarea = document.createElement("textarea");
    textarea.value = content;
    textarea.setAttribute("rows", "" + content.split(/\r*\n/).length);
    textarea.setAttribute("cols", "80");
    textarea.setAttribute("disabled", "true");

    return textarea;
  }

  buildText(content: string) {
    const div = document.createElement("div");
    div.innerText = content;
    return div;
  }
}
