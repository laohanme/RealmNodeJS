const express = require("express");
const route = require("./routes/index");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc")

const app = express();
const portNumber = 3000;

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: "Project Y",
            version: "1.0.0",
        },
    },
    apis: ["./routes/*"],
};
const swaggerDocs = swaggerJsdoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
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
