const Joi = require("@hapi/joi");


const validationCreate = (data) => {
    const schema = Joi.object({
        number_bench:Joi.number().integer().required(),
        detail:Joi.string().min(1).required()
    })

    return schema.validate(data);
}


module.exports.validationCreate = validationCreate;