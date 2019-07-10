import { Component, forwardRef } from '@angular/core';

import { AbstractPaletteComponent } from '../abstract-palette.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MAX_TEXT_LENGTH } from 'src/app/document/shared/model/element.model';

@Component({
  selector: 'app-text-palette',
  templateUrl: './text-palette.component.html',
  styleUrls: ['./text-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => TextPaletteComponent),
                 multi: true
               }
        ]
})
export class TextPaletteComponent extends AbstractPaletteComponent {
  MAX_TEXT_LENGTH = MAX_TEXT_LENGTH;
  onTextChange($event){
    this.element.text = $event;
    this.onChange(this.element);
  }
}
