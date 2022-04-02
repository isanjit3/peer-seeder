const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = 3000 || process.env.PORT;

/* APPLICATION CONFIG */
// setting view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

// body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* ROUTES */
// index page
app.get("/", async (req, res) => {
  res.render("index");
});

// friends page
app.get("/friends", async (req, res) => {
  res.render("friends");
});

// friends page
app.get("/profile", async (req, res) => {
  res.render("profile");
});

/*
  API CALLS
*/
// add new user to database
app.post("/addUser", async (req, res) => {
  res.status(200);
});

// update existing user in database
app.post("/updateUser", async (req, res) => {
  res.status(200);
});

app.delete("/deleteUser", async (req, res) => {
  res.status(200);
});

/*
 HELPER FUNCTIONS
 */
// connect to mongodb

// listening to application at http://localhost:3000/
app.listen(PORT, () => {
  console.log(`Hackathon Template listening at port: ${PORT}`);
});