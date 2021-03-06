const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
// const { uri } = require("./config"); # NEED TO FIX
const uri = "mongodb+srv://peer-seeder-admin:CloudSystems1@peer-seeder.dinup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const { MongoClient } = require("mongodb");
const client = new MongoClient(uri);
const db = client.db("PeerSeederDB");
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
  const { mapbox_accessToken } = require("./config");
  res.render("index", { mapbox_accessToken });
});

// friends page
app.get("/friends", async (req, res) => {
  const users = await db.collection("users").find()

  res.render("friends", { users });
});

app.get("/add-user", async (req, res) => {
  res.render("temp/add-user");
});

app.get("/add-tree", async (req, res) => {
  res.render("temp/add-tree");
});

/*
  API CALLS
*/
// USER CALLS
// add new user to database
app.post("/addUser", async (req, res) => {
  user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    numTrees: req.body.numTrees,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    timestamp: req.body.timestamp,
  };

  db.collection("users").insertOne(user);
  res.status(200).json(user);
});

// update existing user in database
app.post("/updateUser", async (req, res) => {
  res.status(200);
});

app.delete("/deleteUser", async (req, res) => {
  res.status(200);
});

// TREE CALLS
app.post("/addTree", async (req, res) => {
  tree = {
    title: req.body.title,
    placeName: req.body.placeName,
    description: req.body.description,
    submittedBy: req.body.submittedBy,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    timestamp: req.body.timestamp,
  };

  processedTree = processTree(req.body);

  db.collection("trees").insertOne(tree);
  db.collection("coordinates").insertOne(processedTree);
  res.status(200).json(tree);
});

app.get("/generateMap", async (req, res) => {

});

app.get("/updateMap", async(req, res) => {
  console.log("Updating Map!")
  // add implementation to get the data in the correct format to send to MapBox GL
  res.status(200);
});

/*
 HELPER FUNCTIONS
 */
// connect to mongodb
async function main() {
  try {
    await client.connect();
    console.log("Sucessfully connected to MongoDB");
  } catch (e) {
    console.error(e);
  }
}

function processTree(tree) {
  const processedTree = {}
  
  processedTree.latitude = tree.latitude
  processedTree.longitude = tree.longitude
  processedTree.xy = [tree.latitude, tree.longitude]

  return processedTree;
}

// listening to application at http://localhost:3000/
app.listen(PORT, () => {
  main().catch(console.error);
  console.log(`Peer Seeder Application listening at port: ${PORT}`);
});