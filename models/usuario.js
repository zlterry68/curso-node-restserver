const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema({
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
  nombre: {
    type: String,
    required: [true, " El nombre es obligatorio"],
  },
  correo: {
    type: String,
    required: [true, " El correo es obligatorio"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, " La contraseña es obligatorio"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, " El correo es obligatorio"],
    emun: ["ADMIN_ROLE", "USER_ROLE"],
  },
});

UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
