const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geoCode');
const forecast = require('./utils/forecast');

const app = express();

const port = process.env.PORT || 3000;

// Define Express config
const publicDirPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebar engines and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

//Setup static directory
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
    res.render('index', ({
        title: 'Weather',
        name: 'Created by Rishiban'
    }))
});

app.get('/about', (req, res) => {
    res.render('about', ({
        title: "About me",
        name: 'Created by Rishiban'
    }))
});

app.get('/help', (req, res) => {
    res.render('help', ({
        title: "Help",
        name: 'Created by Rishiban',
        helpText: 'This is a help page'
    }))
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Please enter a location',
        });
    }
    geocode(req.query.address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: 'Please give a valid location'
            });
        }
        forecast(latitude, longitude, (error, data) => {
            if (error)
                return res.send({ error: 'error in forecasr' });
            res.send({
                forecast: data,
                location,
                address: req.query.address
            })
        });
    });

});

app.get('/help/*\w', (req, res) => {
    res.render('404', ({
        title: "404: Help page",
        name: 'Created by Rishiban',
        errorMessage: 'Help error page'
    }));
});


app.get('/*\w', (req, res) => { // 
    res.render('404', ({
        title: "404",
        name: 'Created by Rishiban',
        errorMessage: 'error page'
    }));
});

app.listen(port, () => {
    console.log("Server is running on port number " + port);
});