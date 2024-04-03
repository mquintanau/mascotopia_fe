const mongoose = requiere('mongoose');

const URI = 'mongodb+srv://lapabon:n8y1KbbiYzoCxTkG@cluster0.ijgxjfa.mongodb.net/'

mongoose.connect(URI,{
    useNewUriParser: true,
    useCreateIndex: true
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('DB is connected');
});