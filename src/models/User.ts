import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";

export type UserRole = "vendor" | "customer" | "admin" | "manager" | "support";

export interface IUser extends Document {
  username: string;
  profile?: string;
  email: string;
  password: string;
  UserType: UserRole;
  resetPasswordToken?: String;
  resetPasswordExpires?: Date;
  createdAt: Date;
}
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    profile: { type: String, default: "" },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    UserType: {
      type: String,
      enum: ["vendor", "customer", "admin", "manager", "support"],
      default: "customer",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true },
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

export default mongoose.model<IUser>("User", UserSchema);
