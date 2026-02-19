// Second 
// iniatialisation
const express = require('express');
require("dotenv").config();

const cors = require('cors');

const app = express()

const mongoose = require('mongoose');
const Note = require('./models/Note')

const bodyParser = require('body-parser');

// convert json of reqbody
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

// databse conectivity
mongoose.connect(process.env.MONGODB).then(function () {
    // creating routes
    // home route
    app.get("/", function (req, res) {
        // res.send("This is the Home Page");
        const response = {
            message: "New changes done in nodejs server by kapil and then push on to github.",
            newmessage: "clone from github and then push new change",
        };
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
