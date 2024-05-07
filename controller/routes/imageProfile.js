const multer = require('multer');
const path = require('path');
const User = require('../schema/user'); // Asegúrate de que este es el camino correcto a tu modelo de usuario
const router = require("express").Router()

//Creacion y verificacion automatica de la carpeta uploads
const fs = require('fs');
const dirPath = path.join(__dirname, '/uploads');
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '/uploads')) // Ubicación de la carpeta donde se guardarán las imágenes
    },
    filename: function (req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname) // Nombre del archivo
    }
  });

  const upload = multer({ storage: storage });

  // Ruta para cargar la imagen de perfil
router.post('/:id', upload.single('image'), async (req, res) => {
    const {id} = req.params; //Obtén el ID del usuario de los parámetros de la URL
    try {
      const user = await User.findOne({ _id: id }); // Asume que el ID del usuario se envía en el cuerpo de la solicitud
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
      
      user.imageURL = '/uploads/' + req.file.filename; // Aquí se guarda la ruta de la imagen
      await user.save();
      //console.log({ message: 'Image uploaded successfully', user });
    } catch (error) {
      res.status(500).send({ error: 'Server error' });
    }
  });

module.exports = router;