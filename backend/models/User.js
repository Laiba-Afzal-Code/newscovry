import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

// Hash password
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
UserSchema.methods.comparePassword = function (pass) {
  return bcrypt.compare(pass, this.password);
};

export default mongoose.model("User", UserSchema);
