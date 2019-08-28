import { Component, forwardRef, ViewChild, ElementRef, AfterViewChecked, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';


@Component({
  selector: 'app-hyperlink-palette',
  templateUrl: './hyperlink-palette.component.html',
  styleUrls: ['./hyperlink-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => HyperlinkPaletteComponent),
                 multi: true
               }
      ]
})
export class HyperlinkPaletteComponent extends AbstractPaletteComponent implements OnInit{
  linkForm: FormGroup;
  
  ngOnInit(){
    let fb = new FormBuilder();
    this.linkForm = fb.group({
      value: [''],
      link: ['']
    });
  }

  changed(input){
    let value = this.linkForm.get('value').value;
    let link = this.linkForm.get('link').value;

    this.element.text = JSON.stringify({value: value, link: link});
    this.onChange(this.element);
  }
}
