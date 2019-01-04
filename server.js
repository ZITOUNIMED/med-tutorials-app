const express = require("express");
const app = express();
const path = require("path");
const request = require("request");

app.use(express.static(__dirname + "/dist/med-tutorials-app"));

app.listen(process.env.PORT || 8080);

app.get("/*", function(req, res) {
  res.sendFile(path.join(__dirname + "/dist/med-tutorials-app/index.html"));
});

verifyServer();

function verifyServer() {
  setInterval(function() {
    request(
      "https://med-tutorials-rest-api.herokuapp.com/api/wake-up-server",
      function(err, body) {
        if (err) {
          console.log("Can't call server!");
        } else {
          console.log("Server is awake.");
        }
      }
    );
  }, 5 * 60 * 1000);
}

console.log("App is listenning!");
