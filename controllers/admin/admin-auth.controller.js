const db = require("../../models/index");
const Admin = db.admins;
const Op = db.Sequelize.Op;

const fs = require("fs");
const path = require("path")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationRegistration, validationLogin, validationProfile } = require("../../validation/admin/admin-user.validation");

exports.registration = async (req, res) => {
    // validation result
    const {error} = await validationRegistration(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    });

    // request body
    const {email, first_name, last_name, telephone, role} = req.body;
    const avatar = "user.png";

    // email already exists
    const checkEmail = await Admin.findOne({ where:{ email } });
    if(checkEmail){
        return res.json({
            success:false,
            message:"Email already exists"
        });
    }

    // telephone already exists
    const checkTelphone  =await Admin.findOne({ where: {telephone} })
    if(checkTelphone){
        return res.json({
            success:false,
            message:"Telephone already exists"
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
        telephone,
        password,
        avatar,
        role
    }

    // Crate data in database
    try {
        const queryRegistration = await Admin.create(data);
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
    const admin = await Admin.findOne({ where:{ email }});
    if(!admin){
        return res.json({
            success:false,
            message:"Email or password is wrong"
        });
    }

    //  check password
    const checkPassword = await bcrypt.compare(password, admin.password);
    if(!checkPassword){
        res.json({
            success:false,
            message:"Invalid password"
        })
    }

    try {
        const token = await jwt.sign({id_admin:admin.id_admin, role:admin.role}, process.env.SECRET_KEY)
        res.header("auth-token-admin", token);
        res.json({token});
    } catch (err) {
        res.send(err)
    }
}

exports.profile = async (req, res) => {
    const adminId = await req.admin.id_admin;
    
    try {
        const queryAdminProfile = await Admin.findOne( { where:{id_admin:adminId} } );
        res.status(200).json({
            success:true,
            message:"Success, show profile",
            queryAdminProfile
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
    const adminId = await req.admin.id_admin;
    const {first_name, last_name, role} = req.body;
    const avatar = req.file.filename;

    
    // Update user profile in database
    try {
        const queryAdminProfile = await Admin.findOne({ where:{ id_admin:adminId } });
        
        // all fields in users table
        const data = {
            email:queryAdminProfile.email,
            first_name,
            last_name,
            password:queryAdminProfile.password,
            avatar,
            role
        }

        // Deleting photo if photo exists
        if(queryAdminProfile.avatar != "user.png"){
            let pathAvatar = path.join(__dirname+"/../public/photo/"+queryAdminProfile.avatar);
            fs.unlink(pathAvatar, (err)=>{
                if(err){
                    res.json({
                        success:false,
                        message:"Uploading photo error"
                    })
                    return;
                }
            })
        }
        const queryUpdateProfile = await Admin.update(data, { where:{ id_admin:adminId } }); 
        if(queryUpdateProfile == 1){
            res.status(201).json({
                success:true,
                message:"Update profile success",
                data
            });
        }else{
            res.json({
                success:false,
                message:"Update profile failed",
            });
        }
        

    } catch (err) {
        console.log(err)
        res.status(500).json({
            err
        });
    }
}