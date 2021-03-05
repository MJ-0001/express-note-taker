// Dependencies
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const PORT = 3000;
const main = path.join(__dirname, 'public');

app.use(express.static(__dirname + '/public'));
// Handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup route for homepage
app.get('/', (req, res) => res.sendFile(path.join(main, 'index.html')));

// Setup route for note taking page
app.get('/notes', (req, res) => res.sendFile(path.join(main, 'notes.html')));

// Setup route for json page
app.get('/api/notes', (req, res) => res.sendFile(path.join(__dirname, '/db/db.json')));

app.get('/api/notes', (req, res) => {
  fs.readFile('/db/db.json', 'utf8', () => {
    if (err) throw err;
    let notes = JSON.parse(data);
    res.json(notes);
  });
});

app.get('/api/notes', (req, res) => {
  simpleNote(req.body);
  fs.readFile('/db/db.json', 'utf8', () => {
    if (err) throw err;
    let notes = JSON.parse(data);
    res.json(notes);
  });
});

// Initialise server
app.listen(PORT, () => console.log(`app listening on PORT ${PORT}`));

