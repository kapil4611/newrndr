// Second 
// iniatialisation
const express = require('express');
require("dotenv").config();

const app = express()

const mongoose = require('mongoose');
const Note = require('./models/Note') 

const bodyParser = require('body-parser');

// convert json of reqbody
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// databse conectivity
mongoose.connect(process.env.MONGODB).then(function () {
    // creating routes
    // home route
    app.get("/", function (req, res) {
        // res.send("This is the Home Page");
        const response = {message: "API works"};
        res.json(response);
    });

    const noteRouters = require("./routes/Note");
    app.use("/notes", noteRouters);

});

// starting the server at port
const PORT = process.env.PORT || 2000;
app.listen(PORT, function () {
    console.log(`Server started at port: ${PORT}`);
});
