const db = require("../models/index");
const Bench = db.benchs;
const Transaction = db.transactions;


exports.benchMovies = async (req, res) => {
    const movieId = req.params.id_movie;
    try {
        const queryBenchMovies = await Transaction.findAll({
            where:{ id_movie:movieId },
            attributes:[],
            include:[{
                model:Bench,
                attributes:["id_bench", "number_bench", "detail"]
            }]
        })
        res.json({
            success:true,
            message:"Show bench with movie id",
            id_movie:movieId,
            data:queryBenchMovies
        })
    } catch (err) {
        console.log(err)
        res.json({err});
    }
}