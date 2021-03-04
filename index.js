const express = require("express");
const route = require("./app");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();
const portNumber = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(route);

app.listen(portNumber, function () {
    console.log("listening on port " + portNumber + "!");
    console.log(
        "\n\nGo to your browser and type this: http://localhost:" + portNumber
    );
});
