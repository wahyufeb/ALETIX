module.exports = (sequelize, Sequelize)=>{
    const User = sequelize.define("user", {
        id_user: {
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
        password:{
            type:Sequelize.STRING
        },
        avatar:{
            type:Sequelize.STRING
        },
        token_api:{
            type:Sequelize.STRING
        },
    });
    return User;
}