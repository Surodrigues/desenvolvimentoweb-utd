const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
global.__basedir = __dirname;
 
const db = require('./config/db.config.js');

const Cliente = db.Cliente;
const Produto = db.Produto;

let cliente = require('./routes/cliente');
let produto = require('./routes/produto');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(express.static('resources'));
app.use('/clientes', cliente);
app.use('/produtos', produto);

// Create o servidor
const server = app.listen(8080, function () {
 
  let host = server.address().address
  let port = server.address().port
 
  console.log("O App está executando em http://%s:%s", host, port); 
})


// // Testando o banco:
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Reescreve e popula a tabela com { force: true }');
//   Cliente.sync().then(() => {
//     const clientes = [
//       /* { nome: 'Pedro', email: 'pedro@email.com' ,idade: 23 },
//       { nome: 'Sara',  email: 'sara@email.com' , idade: 31 },
//       { nome: 'Emilly',  email: 'emilly@email.com' , idade: 18 },
// 	    { nome: 'Ricardo',  email: 'ricardo@email.com' , idade: 42 }, */
//       {cpf:000, nome:'Pedro', email:'pedro@email.com', endereco:'rua A 320 cambeba, Forteleza-CE 60000', telefone: '085 32222220'}
//     ]
    
//     for(let i=0; i<clientes.length; i++){
//       Cliente.create(clientes[i]);
//     }
  
//   })
// });

// db.sequelize.sync({force: true}).then(() => {
//   console.log('Reescreve e popula a tabela com { force: true }');
//   Produto.sync().then(() => {
//     const produtos = [
//       /* { nome: 'Pedro', email: 'pedro@email.com' ,idade: 23 },
//       { nome: 'Sara',  email: 'sara@email.com' , idade: 31 },
//       { nome: 'Emilly',  email: 'emilly@email.com' , idade: 18 },
//       { nome: 'Ricardo',  email: 'ricardo@email.com' , idade: 42 }, */
//       //{cpf:000, nome:'Pedro', email:'pedro@email.com', endereco:'rua A 320 cambeba, Forteleza-CE 60000', telefone: '085 32222220'}
//       {produto: 'macarrão', quantidade:200, preco: 3.50, categoria:'Alimentos', fornecedor:'Italia Massas S/A'}
//     ]
    
//     for(let i=0; i<produtos.length; i++){
//       Produto.create(produtos[i]);
//     }
//   })

// });