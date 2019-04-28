
import { Element } from './element.model';
import { User } from '../../../user/shared/model/user.model';

export interface Document {
  id: number;
  name: string;
  elements: Element[];
  owner: User
}

export interface DocumentSample {
  id: number;
  name: string;
}
