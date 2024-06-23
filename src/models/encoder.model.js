import mongoose, { Schema } from "mongoose";

const encoderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  address: {
    type: String,
    unique: true,
  },
  Group: {
    type: Array,
  },
});

const EncoderModel = mongoose.model("Encoder", encoderSchema);

export default EncoderModel;
