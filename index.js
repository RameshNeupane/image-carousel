const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
app.use(express.static("public"));
app.get("/", (reqeuest, response) => {
  response.sendFile(path.join(__dirname + "/public/static/index.html"));
});

app.listen(PORT, () => {
  console.log(`app is listening at localhost:${PORT} ...........`);
});
