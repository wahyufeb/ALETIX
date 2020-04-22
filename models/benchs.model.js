module.exports = (sequelize, Sequelize)=>{
    const Bench = sequelize.define("bench", {
        id_bench:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        number_bench:{
            type:Sequelize.INTEGER
        },
        detail:{
            type:Sequelize.STRING
        }
    });
    return Bench;
}