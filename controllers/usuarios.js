const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  // const { q, nombre = "No name", apikey, page = 1, limit } = req.query;

  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };

  // const usuarios = await Usuario.find(query).skip(desde).limit(limite);

  // const total = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query).skip(desde).limit(limite),
  ]);

  res.json({
    total,
    usuarios,
  });
};
const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  // Verificar si el correo existe
  // const existeEmail = await Usuario.findOne({ correo });
  // if (existeEmail) {
  //   return res.status(400).json({
  //     msg: "Ese correo ya está registrado",
  //   });
  // }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  usuario.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD

  await usuario.save();

  res.json({
    // msg: "post API - controlador",
    usuario,
  });
};
const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;

  //TODO validar contra base de datos
  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  res.json(usuario);
};
const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};
const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;

  //Fisicamente lo borramos

  // const usuario = await Usuario.findByIdAndDelete(id);
  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({ usuario });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};
