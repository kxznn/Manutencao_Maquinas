const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    nome: {type: String, required: true, trim: true},
    email: {type: String, required: true, unique: true, lowercase: true, trim: true},
    passwordHash: {type: String, required: true, minlength: 6},
  },

  {timestamps: true}
);
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
