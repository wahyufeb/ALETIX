module.exports = (sequelize, Sequelize)=>{
    const Transaction = sequelize.define("transaction", {
        id_transaction: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue:Sequelize.UUIDV4
        },
        id_movie: {
            type: Sequelize.BIGINT,
        },
        id_bench: {
            type: Sequelize.INTEGER,
        },
        total:{
            type:Sequelize.BIGINT
        },
    });
    return Transaction;
}