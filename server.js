// Initialise dependencies
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3000;
const main = path.join(__dirname, 'public');
const uniqid = require('uniqid');

// Create static location for CSS and JS files
app.use(express.static(__dirname + '/public'));

// Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup route for homepage
app.get('/', (req, res) => res.sendFile(path.join(main, 'index.html')));

// Setup route for note taking page
app.get('/notes', (req, res) => res.sendFile(path.join(main, 'notes.html')));

// Setup route for JSON API
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

// Add a note to the JSON file
addStringArr = (obj, req) => {
  fs.writeFile('./db/db.json', obj, err => {
    req === 'post' ? console.log('Note Added!') : console.log('An error occurred' + err);
  });
}

// Remove a note from the JSON file
remStringArr = (obj, req) => {
  fs.writeFile('./db/db.json', obj, err => {
    req === 'delete' ? console.log('Note Deleted!') : console.log('An error occurred' + err);
  });
}

// API post request
app.post('/api/notes',  (req, res) => {
  // Store notes from array of objects
  const notesArr = require('./db/db.json');
  // Store request body
  const note = req.body;
  // Generate a unique id for each note
  note.id = uniqid();
  // Push notes to the array of objects
  notesArr.push(note);
  // Convert array to JSON
  const stringArr = JSON.stringify(notesArr, null, 2);
  // Add notes to JSON file 
  addStringArr(stringArr, 'post');
  // Render notes to webpage
  return res.json(notesArr);
});

// API delete request
app.delete('/api/notes/:id', (req, res) => {
  // Retrieve the id of the note
  const noteId = req.params.id;
  const notesArr = require('./db/db.json');

  // Iterate through the notes array and delete selected note
  for (let i = 0; i < notesArr.length; i++){
    if (noteId === notesArr[i].id) {
      notesArr.splice(i, 1);
    }
  }

  // Convert the array to JSON
  const stringArr = JSON.stringify(notesArr, null, 2);
  // Call function to update JSON file 
  remStringArr(stringArr, 'delete');
  return res.json(notesArr);
})

// Initialise server
app.listen(PORT, () => console.log(`app listening on PORT ${PORT}`));

