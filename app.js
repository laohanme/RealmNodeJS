const express = require("express");
const user = require("./routes/User");
const app = new express.Router();

app.get("/user/read", (request, response) => {
    let query = request.query;
    response.setHeader("Content-Type", "application/json");
    user.readUser(query)
        .then((result) => {
            response.send({
                status: "success",
                data: result,
                total: result.length,
            });
        })
        .catch((error) => {
            response.send({
                status: "failed",
                message: `${error}`,
            });
        });
});

app.post("/user/add", (request, response) => {
    let header = request.headers;
    let body = request.body;
    response.setHeader("Content-Type", "application/json");

    user.createUser(body)
        .then((result) => {
            response.send({
                status: "success",
                data: result,
            });
        })
        .catch((error) => {
            response.send({
                status: "failed",
                message: `${error}`,
            });
        });
});

app.put("/user/update", (request, response) => {
    let body = request.body;
    response.setHeader("Content-Type", "application/json");
    user.updateUser(body)
        .then((result) => {
            response.send({
                status: "success",
                data: result,
            });
        })
        .catch((error) => {
            response.send({
                status: "failed",
                message: `${error}`,
            });
        });
});

app.delete("/user/delete", (request, response) => {
    let body = request.body;
    response.setHeader("Content-Type", "application/json");
    user.deleteUser(body)
        .then((result) => {
            response.send({
                status: "success",
                data: result,
            });
        })
        .catch((error) => {
            response.send({
                status: "failed",
                message: `${error}`,
            });
        });
});

module.exports = app;
