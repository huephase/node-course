const fs = require('fs');
const express = require('express');
const hbs = require('hbs');
var app = express();
var port = 3001;

// SET view engine
// Also create a 'VIEWS' directory. 'VIEWS' is a default directory express looks for.
app.set('view engine', 'hbs');

// handlebars.js Register Partials
hbs.registerPartials(__dirname + '/views/partials/');
// handlebars.js Register Helpers
hbs.registerHelper('current_year', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('scream_it', (text) => {
    return text.toUpperCase();
});

// custom middleware
app.use((req, res, next) => {
    var now = new Date().toUTCString();
    
    var log = `${now}: ${req.method} | ${req.originalUrl}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });

    next(); // use next to continue
});

// // custom middleware Sample maintainance mode. If next() is not added, it will stop and not continue executing.
// // Enable maintainance mode by commenting and un-commenting lines below
// app.use((req, res, next) => {
//     res.render('maintainance.hbs');
// });

// Built-in middleware EXPRESS.STATIC function to serve static files
app.use(express.static(__dirname + '/public'));


// Built-in middleware EXPRESS.STATIC function to serve static files
app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'HOME PAGE',
        welcomeMessage: 'Welcome!'
    });
});
app.get('/about', (req, res) => {
    res.render('about.hbs', { pageTitle: 'ABOUT PAGE'});
});
app.get('/bad', (req, res) => {
    res.render('404.hbs');
});

app.listen(port, () => {
    console.log(`----\nEXPRESS SERVER STARTED app listening on port ${port}!\n----`)
});