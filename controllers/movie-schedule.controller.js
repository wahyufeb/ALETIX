const axios = require("axios");
const db = require("../models/index");
const MovieSchedule = db.movieSchedule;
const Op = db.Sequelize.Op;

exports.sheduleMovieToday = async (req, res) => {
    try {
        const queryMovieToday = await MovieSchedule.findAll({
            where:{ post_status:true }
        });
        res.json({
            success:true,
            message:"Success, all movie schedule",
            data:queryMovieToday,
        })
    } catch (err) {
        res.json({err});
    }
}

exports.detailSchedule = async (req, res) => {
    const idSchedule = req.params.id_movie;
    try {
        const queryDetailSchedule = await MovieSchedule.findOne({
            where:{ id_movie:idSchedule }
        });

        if(queryDetailSchedule){
            res.json({
                success:true,
                message:`Success, Movie schedule with id ${idSchedule}`,
                data:queryDetailSchedule
            })
        }else{
            res.json({
                success:false,
                message:`Fail, Movie Schedule not found`,
            })
        }
        
    } catch (err) {
        res.json({err});
    }
}

exports.searchSchedule = async (req, res) => {
    const keyword  = req.query.keyword;
    let condition  = keyword ? { 
        judul:{ [Op.like]:`%${keyword}%` } 
    } : null
    
    try {
        const querySearchSchedule = await MovieSchedule.findOne({
            where:condition
        });
        res.json({
            success:true,
            message:"Success, search movies schedule",
            data:querySearchSchedule
        })
    } catch (err) {
        console.log(err)
        res.json({err});
    }
}