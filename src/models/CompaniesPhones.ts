import mongoose, { Schema } from "mongoose"
import { IPhonesCompany } from "./interfaces/itf_phonesCompany";

const PhoneCompanySchema: Schema<IPhonesCompany> = new Schema<IPhonesCompany>({
    idCompany: {type: Number, required: true},
    idPhone: { type: Number, required: true },
    namePhone: {type: String, required: true},
    product: {type: Object, required: true}
});

PhoneCompanySchema.index({
    namePhone: 'text',
});
const PhoneCompany = mongoose.model("PhonesCompany", PhoneCompanySchema);
export default PhoneCompany;