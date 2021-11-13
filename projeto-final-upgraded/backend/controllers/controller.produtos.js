const db = require('../config/db.config.js');
const Produto = db.Produto;
const Op = db.Op;

exports.createProduto = (req, res) => {
    let produtos = {};

    try{
        produtos.produto = req.body.produto;
        produtos.quantidade = req.body.quantidade;
        produtos.preco = req.body.preco;
        produtos.categoria = req.body.categoria;
        produtos.fornecedor =req.body.fornecedor;
    
        // Salvar cliente no banco de dados.
        Produto.create(produtos, 
                          {attributes: ['id', 'produto', 'quantidade', 'preco', 'categoria', 'fornecedor']})
                    .then(result => {    
                      res.status(200).json(result);
                    });
    }catch(error){
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}


exports.getProduto = (req, res) => {
    
    try{
        Produto.findAll({attributes: ['id', 'produto', 'quantidade', 'preco', 'categoria', 'fornecedor'], where: {produto:{[Op.substring]: req.params.produto}}})
        .then(produto => {
            res.status(200).json(produto);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
    
}

exports.produtos = (req, res) => {
    // Buscar todos os registros da tabela 
    try{
        Produto.findAll({attributes: ['id', 'produto', 'quantidade', 'preco', 'categoria', 'fornecedor']})
        .then(produtos => {
            res.status(200).json(produtos);
        })
    }catch(error) {
        // log on console
        console.log(error);

        res.status(500).json({
            message: "Error!",
            error: error
        });
    }
}

exports.deleteProduto = async (req, res) => {
    try{
        let produtoId = req.params.id;
        let produto = await Produto.findByPk(produtoId);

        if(!produto){
            res.status(404).json({
                message: "Não existe nenhum produto " + produtoId,
                error: "404",
            });
        } else {
            await produto.destroy();
            res.status(200).json('produto deletado com sucesso.');
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Não foi possível deletar o produto:" + req.params.id,
            error: error.message
        });
    }
}

exports.updateProduto = async (req, res) => {
    try{
        let produto = await Produto.findOne({attributes: ['id', 'produto', 'quantidade', 'preco', 'categoria', 'fornecedor'], where: { produto:[ req.body.produto] } });
    
        if(!produto){
            
            res.status(404).json({
                message: "Não foi encontrando nenhum produto: " + req.res.produto,
                error: "404"
            });
        } else {    
            
            let updatedObject = {                
                produto: req.body.produto,
                quantidade: req.body.quantidade,
                preco: req.body.preco,
                categoria: req.body.categoria,
                fornecedor: req.body.fornecedor
            }
            let result = await Produto.update(updatedObject,
                              { 
                                returning: true, 
                                where: {produto: req.body.produto},
                                attributes: ['id', 'produto', 'quantidade', 'preco', 'categoria', 'fornecedor']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Não houve alteração no produto: " + req.params.produto,
                    error: "Não pode ser alterado",
                });
            }

            res.status(200).json(updatedObject);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Não pôde ser alterado o produto: " + req.params.produto,
            error: error.message
        });
    }
}
