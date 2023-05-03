// Import database driver
const dbDriver = require('better-sqlite3');

// Connect to db
const db = dbDriver('Bands.sqlite3');

//Import express
const express = require ('express');
// create express app
const app = express();

// Configure express 
app.use(express.static('frontend')); //serve frontend
app.use(express.json());//Use json

/* Building the REST API*/

// Get all
app.get('/bands',(req,res) => {
    //Query all bands
    const bands = db.prepare('SELECT * FROM bands').all();

    //Return bands in json
    res.json(bands);
});

// Get one
app.get('/bands/:id',(req,res) => {
    // Get single from url parameter
    const band = db.prepare('SELECT * FROM bands WHERE id = ?').get(req.params.id);
    // Return json or error
    res.json(band || {error: 'No such band'});
});
//Create anew band
app.post('/bands', (req,res) => {
    //Log out to the console
    console.log(req.body);

    //Get name and genre from the requet body
    const name =req.body.name;
    const genre = req.body.genre;

    //Query the database
    const statement = db.prepare('INSERT INTO bands (name, genre) VALUES (?, ?)');
    const result = statement.run (name ,genre);

    //Return result
    res.json(result);
});

/* Start the App*/
app.listen(3000, () => {
    console.log('Server started on port 3000.')
});
