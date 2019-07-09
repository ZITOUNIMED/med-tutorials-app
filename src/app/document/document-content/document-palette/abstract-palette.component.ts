import { ControlValueAccessor } from "@angular/forms";

export abstract class AbstractPaletteComponent implements ControlValueAccessor {
  /** OnChange */
  private fnChange = (_: any) => {};

  /** OnTouched */
  private fnTouched = () => {};

  data: any;

  writeValue(obj: any): void {
    this.data = obj;
  }

  registerOnChange(fn: any): void {
    this.fnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.fnTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }

  protected onChange($event) {
    this.data = $event;
    this.fnChange($event);
  }

  protected onTouch($event){
    console.log('touched');
  }

}
