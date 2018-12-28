
import { ElementType } from './element-type';

export interface ElementChoice{
  key: ElementType;
  value: string;
}

export const ELEMENTS_CHOICES = [{
  key: ElementType.TEXT,
  value: "Text"
},
{
  key: ElementType.SOURCE_CODE,
  value: "Source code"
},
{
  key: ElementType.BIG_TITLE,
  value: "Titre grand"
},
{
  key: ElementType.MEDIUM_TITLE,
  value: "Titre moyen"
},{
  key: ElementType.SMALL_TITLE,
  value: "Titre petit"
},];
