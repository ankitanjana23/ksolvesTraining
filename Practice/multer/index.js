const express = require("express"); //used to create web server and manage routes get,post
const app = express(); //we use app to use express functionalities

const multer = require("multer"); //to handle file uploaded data
//form data read
//use ejs for server side scripting
const ejs = require("ejs"); //embedded js to handle server side scripting
const path = require("path"); //provide a specifice path

app.set("view engine", "ejs"); //use view engine for file

// Serve static files (optional, if needed)
app.use(express.static(path.join(__dirname, "views")));

// Configure Multer with storage options
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Preserve original extension
  },
});
const upload = multer({ storage });

//upload file using multer
// const upload = multer({ dest: "uploads/" });  //upload file using multer where destination uploads/ if not present so create

app.get("/", (req, res) => {
  res.render("index"); //res.render to this index page
});

//task when user submit something display
app.post("/profile", upload.single("fileUpload"), (req, res) => {
  //get single file with name fileUpload
  console.log(req.body); //text form data
  console.log(req.file); // file data
  return res.redirect("/");
  //   return res
  //     .status(201)
  //     .send(`successfully fetch file ${req.file.originalname} `);
});

app.listen(3000, () => {
  console.log("Server listen on port : 3000");
});

////task2 grace fully shut down server
// after all process complete grace fully shut down server
function termination() {
  console.log("Shutting down server gracefully...");
  process.exit(0);
}

process.on("SIGINT", termination); //used when user press ctrl+c
process.on("SIGTERM", termination); //when pm2 task and other task terminate
// in middle of any request user stop server using ctrl+c failed to lot some useful info
//so we use grace full shut at end after all request get their response
