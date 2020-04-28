module.exports = (sequelize, Sequelize) => {
    const MovieSchedule = sequelize.define("movie_schedule", {
        id_movie:{
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue:Sequelize.UUIDV4
        },
        id_moviedb:{
            type:Sequelize.INTEGER,
        },
        judul:{
            type:Sequelize.STRING
        },
        jam_tayang:{
            type:Sequelize.DATE
        },
        harga_tiket:{
            type:Sequelize.BIGINT
        },
        post_status:{
            type:Sequelize.BOOLEAN
        }
    });
    return MovieSchedule;
}