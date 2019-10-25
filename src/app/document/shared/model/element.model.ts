import { FormGroup } from '@angular/forms';

import { ElementType } from '../element-type';
import { Attachment, emptyAttachment } from './attachment.model';
import {AppElementContent, TextContent} from "./app-element-content";

export interface Element {
  id: number;
  type: ElementType;
  text: string;
  attachment?: Attachment;
  row: number;
  page: number;
  form?: FormGroup;
  appElementContent?: AppElementContent | TextContent;
}

export const emptyElement = (): Element => {
  return {
    id: null,
    type: null,
    text: '',
    attachment: emptyAttachment(),
    row: -1,
    page: -1,
    form: null,
  };
}

export const MAX_TEXT_LENGTH = 1200;
