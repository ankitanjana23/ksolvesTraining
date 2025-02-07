const express = require("express");
const app = express();

// const fs = require("fs");
// const stream = require("stream");
// const status = require("express-status-monitor");

// app.use(status);

/* first approch fs 
app.get("/", (req, res) => {
  fs.readFile("simple.txt", "utf-8", (data, err) => {
    if (err) throw err;
    res.send(data);
  });
});
*/

console.log("hii");
app.get("/", (req, res) => {
  console.log("hii");
  res.send("hellow");
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
