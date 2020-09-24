const request = require('request');

const getWeather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=f5612f5f82ea6c097fe8f7e1f9b94754&units=m&query=' + lat + ',' + long;
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to api', undefined);
        } else if (body.success === false) {
            callback('Unable to get information to that location', undefined);
        } else {
            callback(undefined, {
                icon: body.current.weather_icons[0],
                temp: body.current.temperature,
                hum: body.current.humidity,
                precip: body.current.precip,
                desc: body.current.weather_descriptions[0]
            });
        }
    })
};

module.exports = getWeather;