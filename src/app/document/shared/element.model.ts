import { FormGroup } from '@angular/forms';

import { ElementType } from './element-type';

export interface Element {
  id: number;
  type: ElementType;
  text: string;
  row: number;
  form?: FormGroup
}
