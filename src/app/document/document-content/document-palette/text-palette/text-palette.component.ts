import { Component, forwardRef } from '@angular/core';

import { AbstractPaletteComponent } from '../abstract-palette.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

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
}
