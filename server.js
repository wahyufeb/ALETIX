const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const db = require("./models/index");

// routes
const usersRouter = require("./routes/users.router");
const benchsRouter = require("./routes/benchs.router");

// controllers
const benchsController = require("./controllers/benchs.controller");


app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.use("/v1/user", usersRouter);

app.get("/v1/benchs", benchsController.showAll)
app.use("/v1/bench", benchsRouter);

// sync db
// db.sequelize.sync({force:true})
// .then(()=> console.log("re sync DB"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running at PORT = ${PORT}`))