module.exports = (sequelize, Sequelize) => {
	const Cliente = sequelize.define('clientes', {	
        cpf: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        nome: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        endereco: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        }

	});
	
	return Cliente;
}
