const Joi  = require("@hapi/joi");

const validationMovieSchedule = (data) => {
    const schema = Joi.object({
        id_moviedb:Joi.number().integer().required(),
        jam_tayang:Joi.required(),
        harga_tiket:Joi.number().required(),
        post_status:Joi.boolean()
    });
    return schema.validate(data);
}
module.exports.validationMovieSchedule = validationMovieSchedule;