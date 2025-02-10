const express = require("express");
const app = express();
const fs = require("fs");

app.get("/", (req, res) => {
  const stream = fs.createReadStream("simple.txt", "utf-8");
  stream.pipe(res); // Efficiently pipes the file to response

  stream.on("error", (err) => {
    console.error(err);
    res.status(500).send("Error reading the file");
  });

  /*

  stream.on("data", (chunk) => {
    console.log(`Received chunk: ${chunk}`);
    res.send(chunk);
  });
  stream.on("end", () => {
    console.log("display data successfully");
  });
  stream.on("error", (err) => {
    console.error(err);
  });
  */
});

app.listen(3000, () => {
  console.log("server listen on port 3000");
});
