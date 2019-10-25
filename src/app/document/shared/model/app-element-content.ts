import {ElementType} from "../element-type";

export interface AppElementContent {
  id: number;
  type: ElementType;
}

export interface TextContent extends AppElementContent{
  text: string;
}
