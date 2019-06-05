
import { Element } from './element.model';
import { ConfidentialityTypes } from 'src/app/permissions/model/confidentiality-types';

export const DOCUMENT_DESCRITION_MAX_LENGTH = 300;
export const INPUT_TEXT_LONG = 35;

export interface Document {
  id: number;
  name: string;
  elements: Element[];
  ownerUsername: string;
  confidentiality?: ConfidentialityTypes;
  author: string;
  description: string;
  readonly lastUpdateDate?: string;
  readonly creationDate?: string;
}

export interface DocumentSample {
  id: number;
  name: string;
  ownerUsername: string;
  confidentiality?: ConfidentialityTypes;
}
