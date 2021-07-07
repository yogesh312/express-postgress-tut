const express = require("express");
//const bodyParser = require("body-parser");
const cors = require("cors");
const tutorialRouter = require("./app/routes/tutorial.routes");

const app = express();


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.post("/", (req, res) => {
  const name = req.body.name;
  res.json({ message: "Welcome "+ name });
});

app.use('/api/tutorials', tutorialRouter);


// set port, listen for requests
const PORT = process.env.PORT || 8060;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
process.on("unhandledRejection",(error)=>{
  console.error(error)
});