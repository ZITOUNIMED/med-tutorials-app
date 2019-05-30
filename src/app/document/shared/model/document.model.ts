
import { Element } from './element.model';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';

export interface Document {
  id: number;
  name: string;
  elements: Element[];
  ownerUsername: string;
  confidentiality?: ConfidentialityTypes;
}

export interface DocumentSample {
  id: number;
  name: string;
  ownerUsername: string;
  confidentiality?: ConfidentialityTypes;
}
