const request = require('request');

const getLatLong = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + location + '.json?access_token=pk.eyJ1IjoiaWFuZ3JpZ2lhbmkiLCJhIjoiY2tmNXpmdWNqMDNnbjJ6bTZpa2JsbHZoYSJ9.BujT7LPE9ArFdJnZRUkFng&limit=1';
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to api', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to get geocode from location: ' + location, undefined);
        } else {
            callback(undefined, {
                long: body.features[0].center[0],
                lat: body.features[0].center[1]
            })
        }
    })
};

module.exports = getLatLong;