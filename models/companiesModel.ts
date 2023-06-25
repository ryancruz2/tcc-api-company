import mongoose, { SchemaType } from "mongoose"
import { addressTypeCadaster } from "./interfaces/itf_address";

const companySchema = new mongoose.Schema({
    //cnpj
    _id: {
        type: Number,
        require: true
    },
    //name company
    nameCompany: {
        type: String,
        required: true
    },
    nameProperty: {
        type: String,
        require: true
    },
    nameFantasy: {
        type: String,
        require: true
    },
    address: {
        type: mongoose.SchemaTypeOptions<addressTypeCadaster>,
        require: true
    },
    email: {
        type: String,
        require: true
    }
});

const Company = mongoose.model("Company", companySchema);
export default Company;