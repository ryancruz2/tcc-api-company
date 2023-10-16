import { ICompany, IAddressTypeCadaster } from "./interfaces/itf_address";
import { Types, model, Schema } from "mongoose";

// Create a Mongoose schema for AddressTypeCadaster
const addressTypeCadasterSchema = new Schema<IAddressTypeCadaster>({
  address: { type: String, required: true },
  neighborhood: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  cep: { type: String, required: true },
  localNumber: { type: Number, required: true },
  complement: { type: String, required: true },
});

const Address = model<IAddressTypeCadaster>("Address", addressTypeCadasterSchema);

// Create a Mongoose schema for Company
const companySchema = new Schema<ICompany>({
  _id: { type: Number, required: true }, // You can use a Number type for _id if needed
  nameCompany: { type: String, required: true },
  nameProperty: { type: String, required: true },
  nameFantasy: { type: String, required: true },
  address: { type: Types.ObjectId, ref: "Address",required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  countAvaliacoes: {type: Number, required: true},
  nota: {type: Number, required: true},
});

const Company = model<ICompany>("Company", companySchema);

export {Company, Address};
