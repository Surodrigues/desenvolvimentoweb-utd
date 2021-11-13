module.exports = (sequelize, Sequelize) => {
	const Produto = sequelize.define('produtos', {	
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        produto: {
            type: Sequelize.STRING
        },
        quantidade: {
            type: Sequelize.INTEGER
        },
        preco: {
            type: Sequelize.DECIMAL
        },
        categoria: {
            type: Sequelize.STRING
            // foreign key
        },
        fornecedor: {
            type: Sequelize.STRING
            // foreign key
        }

	});
	
	return Produto;
}