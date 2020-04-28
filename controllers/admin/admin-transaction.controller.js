const axios = require("axios");
const db = require("../../models/index");
const Transaction = db.transactions;
const MovieSchedule = db.movieSchedule;
const Bench = db.benchs;
const User = db.users;


exports.allTransaction = async (req, res) => {
    try {
        const queryAllTransaction = await Transaction.findAll({
            attributes:["id_transaction", "qty", "total", "status"],
            include:[
                {
                    model:MovieSchedule,
                    attributes:["id_moviedb", "judul", "jam_tayang", "harga_tiket", "post_status"]
                },
                {
                    model:Bench,
                    attributes:["number_bench", "detail"]
                },
                {
                    model:User,
                    attributes:["id_user", "email", "first_name", "last_name", "telephone", "avatar"]
                },
            ]
        })
        res.json({
            success:true,
            message:"Success, show all transaction",
            data:queryAllTransaction
        });
    } catch (err) {
        res.json({err});
    }
}

exports.approveTransaction = async (req, res) => {
    const transactionId = req.params.id_transaction;
    try {
        const queryApproveTransaction = await Transaction.update({status:"sudah dibayar"}, {
            where:{
                id_transaction:transactionId
            }
        })
        res.json(queryApproveTransaction);
    } catch (err) {
        res.json({err});
    }
}


