const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://peer-seeder-admin:CloudSystems1@peer-seeder.dinup.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri);
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
  pos = getUserPosition()

  user = {
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    latitude: pos[lat],
    longitude: post[long],
  }

  console.log(user)
  res.status(200)
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
  } finally {
    await client.close();
  }
}

async function getUserPosition() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      coords = {
        lat: position.coords.latitude,
        long: position.coords.longitude
      }
      console.log(coords)
      return coords;
    }, 
    (error) => {
      console.log(error.message)
    });
  }
}

// listening to application at http://localhost:3000/
app.listen(PORT, () => {
  main().catch(console.error);
  console.log(`Peer Seeder Application listening at port: ${PORT}`);
});