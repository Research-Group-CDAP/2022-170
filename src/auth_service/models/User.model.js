const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    fullName: { type: String, required: false },
    password: { type: String, required: false },
    email: { type: String, required: false },
    azureUserName: { type: String, required: false },
    azurePassword: { type: String, required: false },
    resourceGroup: { type: String, required: false },
    clusterName: { type: String, required: false },
    azureSubscriptionId :{ type: String, required: false },
    token: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = User = mongoose.model("User", UserSchema);