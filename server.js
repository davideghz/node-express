const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

// -----------------------------------------------------------
// MIDDLEWARES (called in the order they are written)
// -----------------------------------------------------------
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server.log.');
        }
    });
    next();
});

// Uncomment the middleware below to show a maintenance page and 
// block the application.

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

// middleware to serve static folder
app.use(express.static(__dirname + '/public'));


// -----------------------------------------------------------
// HELPERS
// -----------------------------------------------------------
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


// -----------------------------------------------------------
// ROUTING
// -----------------------------------------------------------
app.get('/', (req, res) => {
    context = {
        pageTitle: 'Home Page',
        welcomeMessage: 'YO this is a welcome message. Dude!'
    }
    res.render('home.hbs', context);
});

app.get('/about', (req, res) => {
    context = {
        pageTitle: 'About Page'
    }
    res.render('about.hbs', context);
});

app.get('/projects', (req, res) => {
    context = {
        pageTitle: 'Projects Page'
    }
    res.render('about.hbs', context);
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request'
    });
});


// -----------------------------------------------------------
// RUN!
// -----------------------------------------------------------
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`);
});

