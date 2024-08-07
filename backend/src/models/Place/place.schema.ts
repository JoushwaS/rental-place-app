import { Schema, model, Document, Types } from "mongoose";

interface IPlace extends Document {
  title: string;
  description: string;
  lat: number;
  lng: number;
  creator: Types.ObjectId;
}

const placeSchema = new Schema<IPlace>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  creator: { type: Schema.Types.ObjectId, ref: "User" },
});

export default model<IPlace>("Place", placeSchema);
