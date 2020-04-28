const axios = require("axios");
const db = require("../../models/index");
const MovieSchedule = db.movieSchedule;

const {validationMovieSchedule} = require("../../validation/admin/movie-today.validation")


exports.getAllSchedule = async (req, res) => {
    try {
        const queryMovieToday = await MovieSchedule.findAll();
        res.json({
            success:true,
            message:"Success, all movie schedule",
            data:queryMovieToday,
        })
    } catch (err) {
        res.json({err});
    }
}

exports.searchFilm = async (req, res) => {
    const keyword = req.query.keyword;
    const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API}&language=en-US&query=${keyword}&page=1&include_adult=true`;
    
    try {
        const reqSearchApi = await axios.get(SEARCH_API);
        const resSearchApi = await reqSearchApi.data;
        res.json(resSearchApi.results);
    } catch (err) {
        res.json({err});
    }

}

exports.createSchedule = async (req, res) => {
    // validation result
    const { error } = await validationMovieSchedule(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    });

    // req body
    const {id_moviedb, jam_tayang, harga_tiket, post_status} = req.body;

    // check if movies already exists
    const checkMovie = await MovieSchedule.findOne({
        where:{ id_moviedb }
    });
    if(checkMovie) return res.json({
        success:false,
        message:"Movie already Exists"
    });

    try { 
        // Req movies to themoviedb API
        const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id_moviedb}?api_key=${process.env.MOVIE_API}&language=en-US`;

        const queryMovieDetail = await axios.get(MOVIE_DETAIL_API)
        const resQueryMovieDetail = await queryMovieDetail.data;
        const judul = resQueryMovieDetail.original_title;

        const data = {
            id_moviedb,
            judul,
            jam_tayang,
            harga_tiket,
            post_status
        }
        

        const queryCreateSchedule = await MovieSchedule.create(data);
        res.status(201).json({
            success:true,
            message:"Success, the movie created",
            data:queryCreateSchedule
        })
    } catch (err) {
        console.log(err)
        res.json({err}); 
    }
}

exports.updateSchedule = async (req, res) => {
    const { error } = validationMovieSchedule(req.body);
    if(error) return res.status(400).json({
        error:error.details[0].message
    });

    // req body
    const movieId = req.params.id_movie;
    const {id_moviedb, jam_tayang, harga_tiket, post_status} = req.body;

    // Req movies to themoviedb API
    const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/movie/${id_moviedb}?api_key=${process.env.MOVIE_API}&language=en-US`;

    const queryMovieDetail = await axios.get(MOVIE_DETAIL_API)
    const resQueryMovieDetail = await queryMovieDetail.data;
    const judul = resQueryMovieDetail.original_title;

    const data = {
        id_moviedb,
        judul,
        jam_tayang,
        harga_tiket,
        post_status
    }

    // check if movies already exists
    const checkMovie = await MovieSchedule.findOne({
        where:{ id_moviedb }
    });
    if(checkMovie) return res.json({
        success:false,
        message:"Movie already Exists"
    });

    try {
        const queryUpdateSchedule = await MovieSchedule.update(data, {
            where:{ id_movie:movieId }
        });

        if(queryUpdateSchedule == 1){
            res.status(201).json({
                success:true,
                message:"Update movie schedule success",
                data
            });
        }else{
            res.json({
                success:false,
                message:"Update movi schedule failed"
            })
        }

    } catch (err) {
        res.json({err});
    }


}

exports.deleteSchedule = async (req, res) => {
    const scheduleId = req.params.id_movie
    try {
        const queryDestroyMovieSchedule = await MovieSchedule.destroy({
            where:{ id_movie:scheduleId }
        });
        if(queryDestroyMovieSchedule === 1){
            res.json({
                success:true,
                message:"Success, the schedule deleted"
            })
        }else{
            res.json({
                success:false,
                message:"Fail, the schedule not deleted"
            })
        }
    } catch (err) {
        res.json({err});
    }
}

