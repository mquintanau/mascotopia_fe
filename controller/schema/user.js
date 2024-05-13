const mongoose = require("mongoose"); //importamos la libreria mongoose para manejar los esquemas
const bcrypt = require("bcrypt"); //importamos la libreria bcrypt para encriptar la contraseña
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../auth/generateTokens"); //importamos la funcion para generar el token de acceso
const Token = require("../schema/token"); //importamos el modelo de token
const getUserInfo = require("../lib/getUserInfo"); //importamos la funcion para obtener la informacion del usuario

// Esquema para la subcolección mascota
const MascotaSchema = new mongoose.Schema({
  nombreMascota: { type: String, required: false },
  animal: { type: String, required: false },
  edad: { type: String, required: false },
  descripcion: { type: String, required: false },
  imageURL: { type: String, required: false },
});

// Esquema para la colección usuario que incluye la subcolección mascota
const UserSchema = new mongoose.Schema({
  correo: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  nombre: { type: String, required: true },
  mascotas: [MascotaSchema], // Referencia al esquema de la subcolección
  numMascotas: { type: Number, required: false },
  rol: { type: String, required: true },
  imageURL: { type: String, required: false },
});

// Modelo para la colección usuario

// const UserModel = mongoose.model('User', UserSchema);

//RECORDAR QUE LOS DOCUMENTOS SON LAS TABLAS EN MONGODB

UserSchema.pre("save", function (next) {
  //funcion que se ejecuta antes de guardar el documento
  if (this.isNew || this.isModified("contraseña")) {
    //si el documento es nuevo o la contraseña ha sido modificada
    const document = this; //guardamos el documento
    bcrypt.hash(document.contraseña, 10, (err, hash) => {
      //encriptamos la contraseña
      if (err) {
        next(err); //si hay un error, lo pasamos al siguiente middleware
      } else {
        document.contraseña = hash; //si no hay error, guardamos la contraseña encriptada
        next(); //pasamos al siguiente middleware
      }
    });
  } else {
    next(); //si no es nuevo ni se ha modificado la contraseña, pasamos al siguiente middleware
  }
});
//Se utiliza next ya que los middleware son funciones que se ejecutan en pila, es decir, una tras otra, y next es la función que se utiliza para pasar al siguiente middleware

UserSchema.methods.usernameExist = async function (username) {
  //funcion para verificar si el username ya existe
  const result = await mongoose.model("User").findOne({ username }); //buscamos un usuario con el username proporcionado
  return !!result; //retornamos si el usuario existe o no
};

UserSchema.methods.correoExist = async function (correo) {
  //funcion para verificar si el correo ya existe
  const result = await mongoose.model("User").findOne({ correo }); //buscamos un usuario con el correo proporcionado
  return !!result; //retornamos si el usuario existe o no
};

UserSchema.methods.comparePassword = async function (contraseña, hash) {
  //funcion para comparar la contraseña encriptada con la contraseña en texto plano
  const same = await bcrypt.compare(contraseña, hash); //comparamos la contraseña en texto plano con la contraseña encriptada
  return same; //retornamos si son iguales o no
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function () {
  const refreshToken = generateRefreshToken(getUserInfo(this)); //creamos el token de refresco
  try {
    await new Token({ token: refreshToken }).save();
    return refreshToken;
  } catch (error) {
    console.log({ error });
  }
};

// module.exports = UserModel; //expotamos el modelo de usuario

module.exports = mongoose.model("User", UserSchema); //exportamos el modelo de usuario
