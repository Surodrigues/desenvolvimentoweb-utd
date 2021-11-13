let express = require('express');
let cliente = express.Router();
 
 /* ROTAS CLIENTES */
const clientes = require('../controllers/controller.cliente.js');

cliente.post('/register', clientes.createCliente);
cliente.get('/search/:cpf', clientes.getCliente);
cliente.get('/list', clientes.clientes);
cliente.put('/update', clientes.updateCliente);
cliente.delete('/delete/:cpf', clientes.deleteCliente);




module.exports = cliente;