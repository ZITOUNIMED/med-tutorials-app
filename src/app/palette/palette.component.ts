import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";

@Component({
  selector: "palette",
  templateUrl: "./palette.component.html",
  styleUrls: ["./palette.component.css"]
})
export class PaletteComponent implements OnInit {
  componentsChoices: any[];
  componentForm: FormGroup;
  @Output() onSubmitChange = new EventEmitter<any>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.componentsChoices = [
      {
        key: "text",
        value: "Text"
      },
      {
        key: "source-code",
        value: "Source code"
      },
      {
        key: "title",
        value: "Title"
      }
    ];

    this.componentForm = this.fb.group({
      componentkey: ["", Validators.required],
      content: ["", Validators.required]
    });
  }

  selectComponent() {
    // const component = this.componentForm.get("component").value;
    // this.onSelectComponentChange.emit(component);
  }

  onSubmit() {
    const componentkey = this.componentForm.get("componentkey").value;
    const content = this.componentForm.get("content").value;
    this.onSubmitChange.emit({
      componentkey: componentkey,
      content: content
    });
  }
}
