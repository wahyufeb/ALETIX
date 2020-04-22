const db = require("../models/index");
const User = db.users;
const Op = db.Sequelize.Op;

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationRegistration, validationLogin, validationProfile } = require("../validation/users.validation");

exports.registration = async (req, res) => {
    // validation result
    const {error} = await validationRegistration(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    });

    // request body
    const {email, first_name, last_name} = req.body;
    const avatar = "user.png";

    // email already exists
    const checkEmail = await User.findOne({ where:{ email }});
    if(checkEmail){
        return res.json({
            success:false,
            message:"Email already exists"
        });
    }
    
    // hash password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    

    // user data
    const data = {
        email,
        first_name,
        last_name,
        password,
        avatar
    }

    // Crate data in database
    try {
        const queryRegistration = await User.create(data);
        res.status(201).json({
            success:true,
            message:"Registration Success",
            data:queryRegistration
        });
    } catch (err) {
        res.status(500).json({
            err
        });
    }

}

exports.login = async (req, res) => {
    // validation result
    const {error} = await validationLogin(req.body);
    if(error) return res.status(400).json({error:error.details[0].message});

    // request body
    const {email, password} = req.body;

    // check email in database
    const user = await User.findOne({ where:{ email }});
    if(!user){
        return res.json({
            success:false,
            message:"Email or password is wrong"
        });
    }

    //  check password
    const checkPassword = await bcrypt.compare(password, user.password);
    if(!checkPassword){
        res.json({
            success:false,
            message:"Invalid password"
        })
    }

    try {
        const token = await jwt.sign({id_user:user.id_user}, process.env.SECRET_KEY)
        res.header("auth-token", token);
        res.json({token});
    } catch (err) {
        res.send(err)
    }
}

exports.profile = async (req, res) => {
    const userId = await req.user.id_user;
    
    try {
        const queryUserProfile = await User.findOne( { where:{id_user:userId} } );
        res.status(200).json({
            success:true,
            message:"Success, show profile",
            queryUserProfile
        });
    } catch (err) {
        res.status(500).json({err})
    }
}

exports.update = async (req, res) => {
    // validation result
    const {error} = await validationProfile(req.body);
    if(error) return res.status(400).json({error:error.details[0].message});

    // request body
    const userId = await req.user.id_user;
    const {first_name, last_name} = req.body;
    const avatar = req.file.filename;

    
    // Update user profile in database
    try {
        const queryUserProfile = await User.findOne({ where:{ id_user:userId } });
        
        // all fields in users table
        const data = {
            email:queryUserProfile.email,
            first_name,
            last_name,
            password:queryUserProfile.password,
            avatar
        }

        const queryUpdateProfile = await User.update(data, { where:{ id_user:userId } }); 

        if(queryUpdateProfile == 1){
            res.status(201).json({
                success:true,
                message:"Update profile success",
                data:queryUserProfile
            });
        }else{
            res.json({
                success:false,
                message:"Update profile failed",
            });
        }
    } catch (err) {
        res.status(500).json({
            err
        });
    }
}