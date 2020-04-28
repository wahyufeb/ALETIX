const fs = require("fs");
const path = require("path")

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const QRCode = require("qrcode");

const app = express();
const db = require("./models/index");

// GENERAL ROUTES
const usersRouter = require("./routes/users.router");
const moviesTodayRouter = require("./routes/movies-today.router");
const transactionRouter = require("./routes/transactions.router");


// ADMIN ROUTES
const adminMoviesRouter = require("./routes/admin/admin-movies.router");
const adminAuthRouter = require("./routes/admin/admin-auth.router"); 
const adminBench = require("./routes/admin/admin-benchs.router");
const adminTransaction = require("./routes/admin/admin-transaction.router");


// GENERAL CONTROLLERS
const benchsController = require("./controllers/benchs.controller");



app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


// GENERAL 
app.use("/v1/user", usersRouter);
app.use("/v1/movie", moviesTodayRouter);
app.use("/v1/transaction", transactionRouter);
app.get("/v1/benchs/:id_movie", benchsController.benchMovies)

// ADMIN
app.use("/v1/admin/movie", adminMoviesRouter);
app.use("/v1/admin/auth", adminAuthRouter)
app.use("/v1/admin/bench", adminBench);
app.use("/v1/admin/transaction", adminTransaction)

// sync db
// db.sequelize.sync({force:true})
// .then(()=> console.log("re sync DB"));



// QRCode.toDataURL('I am a pony!', function (err, url) {
//     console.log(url)
// });


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server running at PORT = ${PORT}`)
})