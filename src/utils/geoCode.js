const request = require('postman-request');

const geoCode = (address, callback) => {
     
    const url = 
'https://api.mapbox.com/search/geocode/v6/forward?q='+address+'&access_token=pk.eyJ1IjoicmlzaGliYW45MSIsImEiOiJjbWJxZmQ4bWkwM2F0Mm1zOWRzcnh2OTBlIn0.3saPcQACnVoTwZ7wonf4xw&limit=1';
console.log(url);  
request({url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
            console.log(error);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].properties.coordinates.longitude,
                latitude: body.features[0].properties.coordinates.latitude,
                location: body.features[0].properties.context.place.name      
            });
        }
    })
}

module.exports = geoCode

