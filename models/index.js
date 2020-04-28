const dbConfig = require("../config/db.config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        operatorAliases:false,
        pool:{
            max:dbConfig.max,
            min:dbConfig.min,
            acquire:dbConfig.acquire,
            idle:dbConfig.idle
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// list table
db.users = require("./users.model")(sequelize, Sequelize);
db.benchs = require("./benchs.model")(sequelize, Sequelize);
db.movieSchedule = require("./movie-schedule.model")(sequelize, Sequelize);
db.transactions = require("./transactions.model")(sequelize, Sequelize);
db.payments = require("./payments.model")(sequelize, Sequelize);

// for admin
db.admins = require("./admin.model")(sequelize, Sequelize);

// associate
db.transactions.belongsTo(db.movieSchedule, {foreignKey:"id_movie"});
db.transactions.belongsTo(db.benchs, {foreignKey:"id_bench"});
db.transactions.belongsTo(db.users, {foreignKey:"id_user"});
db.payments.belongsTo(db.transactions, {foreignKey:"id_transaction"});

sequelize.authenticate()
.then(()=> console.log("DB Connected"))
.catch((err)=> console.log(err));

module.exports = db;