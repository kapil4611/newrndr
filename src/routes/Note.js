const express = require('express');
const router = express.Router();
const Note = require('./../models/Note');

// notes route
// fetch notes
 router.get("/list", async function (req, res) {        
    // res.send("This is Notes Page")
    var notes = await Note.find();
    res.json(notes);
});

// fetch note with userid in url
router.get("/list/:userId", async function (req, res) {  
    var notes = await Note.find({userId: req.params.userId});
    res.json(notes);
});

// fetch note with userid in reqbody
router.post("/list", async function (req, res) {  
    var notes = await Note.find({userId: req.body.userId});
    // console.log("fetched");
    res.json(notes);
});

// update and add
router.post("/add", async function (req, res) {   
    await Note.deleteOne({id: req.body.id});
    const newNote = new Note({
        id: req.body.id,
        userId: req.body.userId,
        title: req.body.title,
        content: req.body.content
    });
    await newNote.save();
    // console.log("updated or added");
    const response = {message: `New note created id: ${req.body.id}`}
    res.json(response);
});

// delete
router.post("/delete", async function(req, res) {
    await Note.deleteOne({id: req.body.id});
    console.log("deleted");
    const response = {message: `Note is deleted ${req.body.id}`}
    res.json(response);
});


module.exports = router;