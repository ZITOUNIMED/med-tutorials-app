import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';


@Component({
  selector: 'app-list-palette',
  templateUrl: './list-palette.component.html',
  styleUrls: ['./list-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => ListPaletteComponent),
                 multi: true
               }
      ]
})
export class ListPaletteComponent extends AbstractPaletteComponent {
  newItemControl = new FormControl();

  addItem(){
    const item = this.newItemControl.value;
    this.data += `<li>${item}</li>`;
    this.onChange(this.data);
  }
}
