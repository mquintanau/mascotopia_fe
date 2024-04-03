const express = require('express'); 
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

//require('./database');
require('dotenv').config();

const port = process.env.PORT || 4000;//puerto del servidor
app.use(cors());//permite que el servidor acepte peticiones de cualquier origen
app.use(express.json());//permite que el servidor pueda recibir y enviar datos en formato JSON


async function connectDB(){
    await mongoose.connect(process.env.DB_CONNECTION_STRING)
    console.log('DB connected')
}

connectDB().catch(console.eror);

//RUTAS
app.use('/api/login', require('./routes/login'));
    


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});