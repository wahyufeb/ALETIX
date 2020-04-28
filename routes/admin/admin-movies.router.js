const express = require("express");
const router = express.Router();

// verify token admin
const verifyTokenAdmin = require("../../helper/verify-admin-token");
const verifyIsAdmin = require("../../helper/verify-admin-role");

// admin movies controller
const adminController = require("../../controllers/admin/admin-movies.controller");

// get all movies schedule
router.get("/schedules", verifyTokenAdmin, verifyIsAdmin, adminController.getAllSchedule);

// search film in THEMOVIEDB
router.get("/search", verifyTokenAdmin, verifyIsAdmin, adminController.searchFilm);

// create schedule
router.post("/schedule/create", verifyTokenAdmin, verifyIsAdmin, adminController.createSchedule);

// update schedule
router.post("/schedule/update/:id_movie", verifyTokenAdmin, verifyIsAdmin, adminController.updateSchedule);

// destroy schedule
router.delete("/schedule/delete/:id_movie", verifyTokenAdmin, verifyIsAdmin, adminController.deleteSchedule);




module.exports = router;