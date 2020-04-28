module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define("admin", {
        id_admin: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue:Sequelize.UUIDV4
        },
        email:{
            type:Sequelize.STRING
        },
        first_name:{
            type:Sequelize.STRING
        },
        last_name:{
            type:Sequelize.STRING
        },
        telephone:{
            type:Sequelize.STRING
        },
        password:{
            type:Sequelize.STRING
        },
        avatar:{
            type:Sequelize.STRING
        },
        role:{
            type:Sequelize.ENUM("admin", "petugas")
        }
    });
    return Admin;
}