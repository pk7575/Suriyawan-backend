import mongoose from "mongoose";

const ownerSchema = new mongoose.Schema({
  email: String,
  password: String
});

export default mongoose.model("Owner", ownerSchema);
