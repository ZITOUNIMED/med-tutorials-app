
import { Element } from './element.model';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';

export interface Document {
  confidentiality: ConfidentialityTypes;
  id: number;
  name: string;
  elements: Element[];
  ownerUsername: string;
}

export interface DocumentSample {
  id: number;
  name: string;
  ownerUsername: string;
  confidentiality: ConfidentialityTypes;
}
