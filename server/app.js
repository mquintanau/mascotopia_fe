const path = require('path');
const { fileURLToPath } = require('url');
const express = require('express'); 
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');


require('dotenv').config();

const port = process.env.PORT || 4000;//puerto del servidor
app.use(cors());//permite que el servidor acepte peticiones de cualquier origen
app.use(express.json());//permite que el servidor pueda recibir y enviar datos en formato JSON


//CONEXIÓN CON LA BASE DE DATOS
async function connectDB(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log('DB connected')
}

connectDB().catch(console.eror);

//RUTAS
app.use('/api/login', require('./routes/login'));
app.use('/api/userProfile', require('./routes/userProfile'));
app.use('/api/signup', require('./routes/signup')); 
app.use('/api/forgotPassword', require('./routes/forgotPassword')); 
app.use('/api/resetPassword', require('./routes/resetPassword'));

//Use the client folder in production
app.use(express.static(path.join(__dirname,'/client/dist')));

// Render cliend index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/dist/index.html'));
})

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});