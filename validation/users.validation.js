const Joi = require("joi");

const validationRegistration = (data) => {
    const schema = {
        email:Joi.string().min(6).email().required(),
        first_name:Joi.string().min(1).required(),
        last_name:Joi.string().min(1).required(),
        password:Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
}

const validationLogin = (data) => {
    const schema = {
        email:Joi.string().min(6).email().required(),
        password:Joi.string().min(6).required(),
    }
    return Joi.validate(data, schema);
} 

const validationProfile = (data) => {
    const schema = {
        first_name:Joi.string().min(1).required(),
        last_name:Joi.string().min(1).required(),
    }
    return Joi.validate(data, schema);
}



module.exports.validationRegistration = validationRegistration;
module.exports.validationLogin = validationLogin;
module.exports.validationProfile = validationProfile;
