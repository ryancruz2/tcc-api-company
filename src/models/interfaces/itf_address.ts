import { Document, Types } from 'mongoose';
import { Address } from '../companiesModel';

export interface IAddressTypeCadaster {
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  cep: string;
  localNumber: number;
  complement: string;
}


export interface ICompany extends Document {
  _id: number;
  nameCompany: string;
  nameProperty: string;
  nameFantasy: string;
  address: IAddressTypeCadaster;
  email: string;
  phone: string;
  countAvaliacoes: number;
  nota: number;
  [key: string]: any; 
}

