const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
    const url =
        'https://api.weatherstack.com/current?access_key=2fbb153ccf29c8e284b70873f10fceeb&query=' + longitude + ',' + latitude;
    
        // request is a function that takes 2 arguments. First is the data (URL, in this case), and second is the callback()
        request({ url, json: true }, (error, { body }) => { 
        if (error) {
            callback("Cannot connect with Webstack", undefined);
        }
        else if (body.error) {
            callback("Please enter a valid coordinates", undefined);
            console.log(body.error)
        }
        else {
            callback(undefined, 'Currently the temperature is ' + body.current.temperature + 
                        'degrees. It feels like ' + body.current.feelslike + 'degrees. The humidity is ' + body.current.humidity);
        }
    });
}

module.exports = forecast;