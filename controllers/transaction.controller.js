const axios = require("axios");
const randomString = require("random-string");

const db = require("../models/index");

// models
const Transaction = db.transactions;
const User= db.users;
const MovieSchedule = db.movieSchedule;
const Bench = db.benchs;
const Payment = db.payments;

const Op = db.Sequelize.Op;

// validation transaction
const {validationTransaction} = require("../validation/transaction.validation");

exports.createTransaction = async (req, res) => {
    const { error } = await validationTransaction(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    });

    // req body
    const { id_user } = req.user;
    const {id_movie, id_bench, qty, total} = req.body;
    

    // check if user have a transaction history
    const cekTransactionHistory = await Transaction.findOne({ where:{ id_user } } );

    // check if user got a transaction & status "belum dibayar"
    const cekTransaksiBelumBayar = await Transaction.findOne({
        where:{
            id_user,
            status:"belum dibayar"
        }
    });

    // check if user got a transaction & status "sudah dibayar"
    const cekTransaksiSudahBayar = await Transaction.findOne({
        where:{
            id_user,
            status:"sudah dibayar"
        }
    });

    // check if id_bench is already exists in transaction table
    const cekBench = await Transaction.findOne({ where:{ id_bench } });

    // check if id_bench exists in bench table
    const cekBenchId = await Bench.findOne({ where:{ id_bench } });

    // check movies and bench if user buy ticket with same bench and different movies
    const cekMovieBench = await Transaction.findOne({
        where:{
            id_movie,
            id_bench
        }
    });

    // jika user memiliki transaction history
    if(cekTransactionHistory){
        // jika belum dibayar, maka tidak akab bisa melakukan transaksilagi
        if(cekTransaksiBelumBayar) return res.json({
            success:false,
            message:"Fail, your transaction has been not completed"
        });

        // jika sudah dibayar, maka akan disarankan untuk bersiap siap
        if(cekTransaksiSudahBayar){
            if(cekTransactionHistory.id_movie === id_movie && cekTransactionHistory.id_bench === id_bench){
                return res.json({
                    success:false,
                    message:"Your transaction exists"
                });
            }
        }

        // cek jika bench tidak ada
        if(cekBenchId === null) return res.json({
            success:false,
            message:"Fail, bench not found"
        });

        // cek jika movies dan bench sudah dipesan oleh user lain
        if(cekMovieBench !== null){
            if(cekMovieBench === "belum dibayar"){
                return res.json({
                    success:"false",
                    message:"Fail, bench was ordered"
                })
            }
        }
    }else{
        // cek jika bench tidak ada
        if(cekBenchId === null) return res.json({
            success:false,
            message:"Fail, bench not found"
        });

        // cek jika bench sudah ada pada transaksi
        if(cekBench){
            return res.json({
                success:false,
                message:"Fail, bench already exists"
            })
        }
    }

    if(cekMovieBench !== null){
        // cek jika movies dan bench sudah dipesan oleh user lain
        if(cekMovieBench.status === "belum dibayar" ){
            return res.json({
                success:"false",
                message:"Fail, bench was ordered"
            })
        }
    }

    //  for trnasaction table
    const data = {
        id_movie,
        id_bench,
        id_user,
        qty,
        total,
        status:"belum dibayar"
    }

    // for midtrans data
    const headersSandbox = {
        "Accept":"application/json",
        "Content-Type":"application/json",
        Authorization:"Basic U0ItTWlkLXNlcnZlci02NzRaaV8xVWhnZEJnajlKaTJOdkJuMXU6"
    }
    // const headersProduction = {
    //     "Accept":"application/json",
    //     "Content-Type":"application/json",
    //     Authorization:"Basic TWlkLXNlcnZlci00YXdfbWlUMFU0WVJfb2tEMHgzU0RtaUY6"
    // }
    const midtransData = { }

    try {
        let date = new Date();
        date.setDate(date.getDate() + 1)

        // create transaction
        const queryNewTransaction = await Transaction.create(data);

        // query for get User
        const queryUser = await User.findOne({ 
            where:{ id_user:queryNewTransaction.id_user },
        });

        const queryMovieSchedule = await MovieSchedule.findOne({
            where:{ id_movie:queryNewTransaction.id_movie }
        })

        const judul = queryMovieSchedule.judul.split(" ",2);


        midtransData.transaction_details = {
            order_id:queryNewTransaction.id_transaction,
            gross_amount:queryNewTransaction.total
        }
        midtransData.customer_details = {
                first_name:queryUser.first_name,
                last_name:queryUser.last_name,
                email:queryUser.email,
                phone:queryUser.telephone
        };
        midtransData.expiry = {
                start_time: date.toISOString().replace(/T/, ' ').replace(/\..+/, '')+" +0700",
                unit: "minutes",
                duration: 1
        };
        midtransData.item_details = [
            {
                id:queryMovieSchedule.id_movie,
                price:queryMovieSchedule.harga_tiket,
                quantity:queryNewTransaction.qty,
                name:"Tiket "+judul[0] +" "+ judul[1],
            }
        ]
        midtransData.enable_payments = [
            "credit_card", "mandiri_clickpay", "cimb_clicks",
            "bca_klikbca", "bca_klikpay", "bri_epay", "telkomsel_cash", "echannel",
            "indosat_dompetku", "mandiri_ecash", "permata_va", "bca_va",
            "bni_va", "other_va", "kioson", "indomaret", "gci", "danamon_online"
        ]
        midtransData.credit_card = {
            secure: true,
            channel: "migs",
            bank: "bca",
            installment: {
                required: false,
                terms: {
                    bni: [3, 6, 12],
                    mandiri: [3, 6, 12],
                    cimb: [3],
                    bca: [3, 6, 12],
                    offline: [6, 12]
                }
            }
        }
        midtransData.whitelist_bins = [
            "48111111",
            "41111111"
        ]

        // Req to Midtrans API for generate payment token
        const MIDTRANS_API_SANDBOX = process.env.MIDTRANS_SANDBOX;
        // const MIDTRANS_API_PRODUCTION = process.env.MIDTRANS_PRODUCTION;
        const midtransNewTransaction = await axios.post(MIDTRANS_API_SANDBOX, midtransData, {
            headers:headersSandbox
        });
        const resMidtransNewTransaction = await midtransNewTransaction.data;
        
        // Generate QR code and insert to payments table
        const qr = randomString({
            length:8,
            numeric:true,
            letters:true
        }).toUpperCase();
        const paymentData = {
            id_transaction:queryNewTransaction.id_transaction,
            qr,
            token:resMidtransNewTransaction.token
        }
        const queryNewPayment = await Payment.create(paymentData);

        res.json({
            success:true,
            message:"Success, the Transaction created",
            data: queryNewPayment
        });
    } catch (err) {
        console.log(err)
        res.json({err});
    }

}

exports.myTransaction = async (req, res) => {
    const userId = req.user.id_user;
    try {
        const queryMyTransaction = await Transaction.findOne({
            where:{ id_user:userId },
            attributes:["id_transaction", "qty", "total"],
            include:[{
                model:MovieSchedule,
                attributes:["id_movie", "judul", "harga_tiket"]
            }]
        });
        res.json(queryMyTransaction);
    } catch (err) {
        console.log(err);
        res.json({err});
    }
}

exports.myTransactionDetail = async (req, res) => {
    const userId = req.user.id_user;
    try {
        const queryMyTransaction = await Transaction.findOne({
            where:{ id_user:userId }
        });
        const transactionId = queryMyTransaction.id_transaction;
        const queryPayment = await Payment.findAll({
            attributes:["id_payment", "qr","token"],
            where:{ id_transaction:transactionId },
                include:[
                    {
                        model:Transaction,
                        attributes:["id_transaction", "qty", "total", "status"],
                        include:[
                            {
                                model:Bench,
                                attributes:["id_bench", "number_bench", "detail"]
                            },
                            {
                                model:MovieSchedule,
                                attributes:["id_movie", "judul", "harga_tiket", "jam_tayang"],
                            }
                        ]
                    }
                ]
        })
        res.json(queryPayment);
    } catch (err) {
        console.log(err);
        res.json({err});
    }
}
