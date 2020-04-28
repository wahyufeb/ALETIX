const express = require("express");
const router = express.Router();

// movie today controller
const movieScheduleController = require("../controllers/movie-schedule.controller");

// All Movies Schedule
router.get("/schedule", movieScheduleController.sheduleMovieToday)

// Movie Schedule Detail
router.get("/schedule/detail/:id_movie", movieScheduleController.detailSchedule);

// Search Movies
router.get("/search", movieScheduleController.searchSchedule);



module.exports = router;