const db = require("../../models/index");
const Bench = db.benchs;
const Op = db.Sequelize.Op;


const {validationCreate}  = require("../../validation/benchs.validation");

exports.showAll = async (req, res) =>{
    try {
        const queryAllBenchs = await Bench.findAll();
        res.status(200).json({
            success:true,
            message:"Success, Show All Benchs",
            data:queryAllBenchs
        })
    } catch (err) {
        res.json({err});
    }
}

exports.create = async (req, res) => {
    // validation result
    const { error } = await validationCreate(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    })

    // request body
    const {number_bench, detail} = req.body;

    // check if number_bench already exists
    const checkNumberBench = await Bench.findOne({
        where:{ number_bench }
    });
    if(checkNumberBench) return res.json({
        success:false,
        message:"Number bench already Exists"
    });

    const data = {
        number_bench,
        detail
    }

    try {
        const queryCreate = await Bench.create(data);
        res.status(201).json({
            success:true,
            message:"Success, the bench created",
            data:queryCreate
        });
    } catch (err) {
        res.json({err});
    }
}

exports.update = async (req, res) => {
    // validation result
    const { error } = await validationCreate(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    });

    // request body
    const benchId = req.params.id_bench;
    const {number_bench, detail} = req.body;

    const data = {
        number_bench,
        detail
    }

    // update bench in database
    try {
        const queryUpdateBench = await Bench.update(data, {
            where:{ id_bench:benchId }
        });
        
        if(queryUpdateBench == 1){
            res.status(201).json({
                success:true,
                message:"Update bench success",
            });
        }else{
            res.json({
                success:false,
                message:"Update bench failed"
            })
        }
    } catch (err) {
        res.json({err})
    }
}

exports.delete = async (req, res) => {
    // request body
    const benchId = req.params.id_bench;

    try {

        const queryBenchDestroy = await Bench.destroy({
            where:{ id_bench:benchId }
        });

        if(queryBenchDestroy === 1){
            res.json({
                success:true,
                message:"Bench deleted"
            })
        }else{
            return res.json({
                success:false,
                message:"Bench not found"
            })
        }

    } catch (err) {
        res.json({err});
    }
}