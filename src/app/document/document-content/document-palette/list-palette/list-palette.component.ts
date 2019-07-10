import { Component, forwardRef, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
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
export class ListPaletteComponent extends AbstractPaletteComponent implements AfterViewChecked {
  newItemControl = new FormControl();
  @ViewChild('items') items: ElementRef;
  ids = 0;

  ngAfterViewChecked(): void {
    this.addIds();
  }

  private addIds(){
    for(let i=0; i<this.items.nativeElement.children.length; i++){
      if(!this.items.nativeElement.children[i].id){
        this.items.nativeElement.children[i].id = this.ids++;
      }
    }
  }

  addItem(){
    const item = this.newItemControl.value;
    this.element.text += `<li>${item}</li>`;
    this.newItemControl.setValue('');
    this.addIds();
    this.onChange(this.element);
  }
}
