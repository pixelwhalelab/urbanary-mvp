import mongoose, { Schema, Document, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

export interface IUser extends Document {
  name: string;
  email: string;
  uniqueId: string;
  dob: Date;
  password: string;
  verified: boolean;
  otpHash?: string;
  otpExpiresAt?: Date;
  resetPasswordToken?: string;
  resetPasswordExpiresAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    uniqueId: {
      type: String,
      unique: true,
      default: uuidv4,
      immutable: true, 
    },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    otpHash: { type: String },
    otpExpiresAt: { type: Date },
    resetPasswordToken: { type: String, index: true },
    resetPasswordExpiresAt: { type: Date },
  },
  { timestamps: true }
);

const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
