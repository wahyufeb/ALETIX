const Joi = require("joi");


const validationCreate = (data) => {
    const schema = {
        number_bench:Joi.required(),
        detail:Joi.string().min(1).required()
    }

    return Joi.validate(data, schema);
}



module.exports.validationCreate = validationCreate;