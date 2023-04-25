const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "Error es obligatorio"],
  },
});

module.exports = model("Role", RoleSchema);
