const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const weatherstack = require('./utils/weatherstack');
const chalk = require('chalk');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const templatesDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', templatesDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath));


app.get('', (req, res)=>{
    res.render('index', {
        title: 'Home page',
        author: 'Nacho'
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        author: 'Nacho'
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        author: 'Nacho'
    });
})


app.get('/help/*', (req, res)=>{
    res.render('404', {
        title: 'Help not found',
        author: 'Nacho',
        message: 'Help page not found'
    });
})


app.get('/weather', (req, res)=>{
    const address = req.query.address;
    if (!address) {
        return res.send('Must provide an address!');
    }

    geocode(address, (error, {lat, long}={}) => {
        if (error) {
            res.send({error});
        } else {
            weatherstack(lat, long, (error, {temp, desc}={}) => {
                if (error) {
                    res.send({error});
                } else {
                    res.send({
                        temp,
                        desc
                    });
                }
            })
        }
    })
})

app.get('*', (req, res)=>{    
    res.render('404', {
        title: 'Not Found',
        author: 'Nacho',
        message: 'Page not found'
});

})

app.listen(3000, ()=> {
    console.log('Running...');
});