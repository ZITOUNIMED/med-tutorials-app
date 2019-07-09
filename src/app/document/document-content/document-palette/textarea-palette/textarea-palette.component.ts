import { Component, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractPaletteComponent } from '../abstract-palette.component';

@Component({
  selector: 'app-textarea-palette',
  templateUrl: './textarea-palette.component.html',
  styleUrls: ['./textarea-palette.component.css'],
  providers: [{
                 provide: NG_VALUE_ACCESSOR,
                 useExisting: forwardRef(() => TextareaPaletteComponent),
                 multi: true
               }
        ]
})
export class TextareaPaletteComponent extends AbstractPaletteComponent {
}
