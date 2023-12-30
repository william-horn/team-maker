
import mongoose, { Schema } from "mongoose";

const foobarSchema = new Schema(
  {
    name: String,
    description: String
  },
  {
    timestamps: true,
  }
);

const Foobar = mongoose.models.Foobar || mongoose.model("Foobar", foobarSchema);

export default Foobar;

