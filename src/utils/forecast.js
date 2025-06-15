const request = require('postman-request');

const forecast = (longitude, latitude, callback) => {
   const url =
        'https://api.weatherstack.com/current?access_key=1a9b911d6448896bd7ec6cb9489eb353&query=' + longitude + ',' + latitude + '&units=f';
    request({url, json: true }, (error, {body}) => {
        if (error) {
            callback("Cannot connect with Webstack", undefined);
        }
        else if (body.error) {
            callback("Please enter a valid coordinates", undefined);
            console.log(body.error)
        }
        else {
            callback(undefined, 'Current temp is '+ body.current.temperature + '. It feels like ' + body.current.feelslike
                    // Current_temperature: response.body.current.temperature,
                    // feels_Like: response.body.current.feelslike
                )
        }
    });
}

module.exports = forecast;