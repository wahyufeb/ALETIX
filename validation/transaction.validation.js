const Joi = require("@hapi/joi");

const validationTransaction = (data) => {
    const schema = Joi.object({
        id_movie:Joi.string().required(),
        id_bench:Joi.required(),
        qty:Joi.number().required(),
        total:Joi.number().required(),
    });
    return schema.validate(data);
}

module.exports.validationTransaction = validationTransaction;