'use strict';
module.exports = (sequelize, Sequelize)=>{
    const Transaction = sequelize.define("transaction", {
        id_transaction: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue:Sequelize.UUIDV4
        },
        id_movie: {
            type: Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4
        },
        id_bench: {
            type: Sequelize.INTEGER,
        },
        id_user: {
            type: Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4
        },
        qty:{
            type:Sequelize.INTEGER
        },
        total:{
            type:Sequelize.BIGINT
        },
        status:{
            type:Sequelize.ENUM("belum dibayar", "sudah dibayar", "selesai")
        }
    });
    return Transaction;
}