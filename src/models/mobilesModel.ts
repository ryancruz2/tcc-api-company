import mongoose, { Schema } from "mongoose"
import { IPhones } from "./interfaces/itf_phones"

const phoneSchema: Schema<IPhones> = new Schema<IPhones>({
    _id: { type: Number, required: true },
    Name: { type: String, required: true },
    Image: { type: String, required: true },
    Maker: { type: String, required: true },
});
phoneSchema.index({
    Name: 'text',
    Maker: 'text',
});

const Phones = mongoose.model("Phones", phoneSchema);
export default Phones;