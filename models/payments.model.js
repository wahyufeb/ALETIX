module.exports = (sequelize, Sequelize)=>{
    const Payment = sequelize.define("payment", {
        id_payment: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue:Sequelize.UUIDV4
        },
        id_transaction: {
            type: Sequelize.UUID,
            defaultValue:Sequelize.UUIDV4
        },
        qr:{
            type:Sequelize.STRING
        },
        token:{
            type:Sequelize.STRING,
        }
    });
    return Payment;
}