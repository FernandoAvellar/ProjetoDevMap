
/// Métodos HTTP: GET, POST, PUT, DELETE
// Tipos de parâmetros
// Query Params: request.query (Filtros, ordenação, paginação, et...)
// Route Params: request.params (Identificar um recurso na alteração ou remoção) 
// Body: request.body (Dados para criação ou alteração de um registro)

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://fernando:fernando@cluster0-pweit.mongodb.net/week10?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    });

    app.use(cors()); //Liberando acesso para todos os domínios
app.use(express.json()); // Falando pro express entender Json inclusive o routes que está abaixo
app.use(routes);
app.listen(8080);


