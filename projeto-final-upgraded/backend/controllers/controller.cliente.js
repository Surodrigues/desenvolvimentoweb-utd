const db = require('../config/db.config.js');
const Cliente = db.Cliente;

exports.createCliente = (req, res) => {
    let clientes = {};

    try{
        // Capturando os dados do body e criando a constante cliente.
        /* cliente.nome = req.body.nome;
        cliente.email = req.body.email;
        cliente.idade = req.body.idade; */

        clientes.cpf = req.body.cpf;
        clientes.nome = req.body.nome;
        clientes.email = req.body.email;
        clientes.endereco = req.body.endereco;
        clientes.telefone = req.body.telefone;
    
        // Salvar cliente no banco de dados.
        Cliente.create(clientes, 
                          {attributes: ['cpf', 'nome', 'email', 'endereco', 'telefone']})
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

exports.getCliente = (req, res) => {
    Cliente.findByPk(req.params.cpf)
    // , 
    //                     {attributes: ['cpf', 'nome', 'email', 'endereco', 'telefone']})
        .then(cliente => {
          res.status(200).json(cliente);
        }).catch(error => {
          // mostrar no console a mensagem de erro.
          console.log(error);

          res.status(500).json({
              message: "Error!",
              error: error
          });
        })
}

exports.clientes = (req, res) => {
    // Buscar todos os registros da tabela 
    try{
        Cliente.findAll({attributes: ['cpf', 'nome', 'email', 'endereco', 'telefone']})
        .then(clientes => {
            res.status(200).json(clientes);
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

exports.deleteCliente = async (req, res) => {
    try{
        let clienteId = req.params.cpf;
        let cliente = await Cliente.findByPk(clienteId);

        if(!cliente){
            res.status(404).json({
                message: "Não existe nenhum cliente com o cpf digitado " + clienteId,
                error: "404",
            });
        } else {
            await cliente.destroy();
            res.status(200).json('cliente deletado com sucesso.');
        }
    } catch(error) {
        res.status(500).json({
            message: "Error -> Não foi possível deletar o cliente com o cpf:" + req.params.cpf,
            error: error.message
        });
    }
}

exports.updateCliente = async (req, res) => {
    try{
        let cliente = await Cliente.findByPk(req.body.cpf);
    
        if(!cliente){
            
            res.status(404).json({
                message: "Não foi encontrando nenhum cliente com cpf: " + req.body.cpf,
                error: "404"
            });
        } else {    
            
            let updatedObject = {
                cpf: req.body.cpf,                
                nome: req.body.nome,
                email: req.body.email,
                endereco: req.body.endereco,
                telefone: req.body.telefone
            }
            let result = await Cliente.update(updatedObject,
                              { 
                                returning: true, 
                                where: {cpf: req.body.cpf},
                                attributes: ['cpf', 'nome', 'email', 'endereco', 'telefone']
                              }
                            );

            // return the response to client
            if(!result) {
                res.status(500).json({
                    message: "Error -> Não houve alteração no cliente com cpf: " + req.params.cpf,
                    error: "Não pode ser alterado",
                });
            }

            res.status(200).json(updatedObject);
        }
    } catch(error){
        res.status(500).json({
            message: "Error -> Não pôde ser alterado o cliente com o cpf: " + req.params.cpf,
            error: error.message
        });
    }
}