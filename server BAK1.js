const express = require('express');
var app = express();
var port = 3001;

// Built-in middleware EXPRESS.STATIC function to serve static files
app.use(express.static(__dirname + '/public'));

// Built-in middleware EXPRESS.STATIC function to serve static files
app.get('/', (req, res) => {
    res.send({
        name: 'Andrew',
        likes: [
            'Biking',
            'Cities'
        ]
    });
});
app.get('/about', (req, res) => {
    res.send('<h1 style="font-family:sans-serif;">About Page</h1>');
});
app.get('/bad', (req, res) => {
    res.send({
        error_message: 'Unable to handle request'
    });
});

app.listen(port, () => {
    console.log(`----\nEXPRESS SERVER STARTED app listening on port ${port}!\n----`)
});