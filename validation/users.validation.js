const Joi = require("@hapi/joi");

const validationRegistration = (data) => {
    const schema = Joi.object({
        email:Joi.string().min(6).email().required(),
        first_name:Joi.string().min(1).required(),
        last_name:Joi.string().min(1).required(),
        telephone:Joi.number().required(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(data);
}

const validationLogin = (data) => {
    const schema = Joi.object({
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required(),
    })
    return schema.validate(data);
} 

const validationProfile = (data) => {
    const schema = Joi.object({
        first_name:Joi.string().min(1).required(),
        last_name:Joi.string().min(1).required(),
    })
    return schema.validate(data);
}



module.exports.validationRegistration = validationRegistration;
module.exports.validationLogin = validationLogin;
module.exports.validationProfile = validationProfile;
