const request = require('postman-request');

const geoCode = (address, callback) => {

    const url =
        'https://api.mapbox.com/search/geocode/v6/forward?q=' + address + '&access_token=pk.eyJ1IjoicmlzaGliYW45MSIsImEiOiJjbWYxNGplZ3gwejIzMmxyMXVqOTNoYzdzIn0.Ww-xSh-0EHVJ4o1gB_90dQ';
    request({ url, json: true }, (error, { body }) => { // this was the response before, but now it is destructured
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) { // this was response.body.features.length before
            console.log("dei " + body.features.length);
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].properties.coordinates.longitude,
                latitude: body.features[0].properties.coordinates.latitude,
                location: body.features[0].properties.context.place.name +', ' + 
                                                        body.features[0].properties.context.country.name
            });
        }
    });
}

module.exports = geoCode


