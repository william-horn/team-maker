
import mongoose, { Schema } from "mongoose";
import connectMongoDB from "@/lib/db/mongodb-connect";

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

