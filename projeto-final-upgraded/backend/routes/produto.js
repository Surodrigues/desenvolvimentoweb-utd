let express = require('express');
let produto = express.Router();

/*  ROTAS PRODUTOS */
const produtos = require('../controllers/controller.produtos.js');

produto.post('/register', produtos.createProduto);
produto.get('/search/:produto', produtos.getProduto);
produto.get('/list', produtos.produtos);
produto.put('/update', produtos.updateProduto);
produto.delete('/delete/:id', produtos.deleteProduto);




module.exports = produto;