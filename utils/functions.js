const request = require('request')


const mapBoxToken = 'pk.eyJ1Ijoib2xlZ3B1emFua2luIiwiYSI6ImNrNXV5amxkODA1bW8zcmxsamk3czR2OWgifQ.3UdPR79ADZnzS4-Q4HGYKQ'




function geocode(address, callback) {
    const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${mapBoxToken}&limit=1`

    request({ url: geocodingUrl, json: true }, (e, {body}) => {

        if (e) {
            callback('no connection', undefined)
        } else if (body.features.length === 0) {
            callback('nothing found lol', undefined);

        }
        else {
            const latitude = body.features[0].center[1]
            const longitude = body.features[0].center[0]
            const place = body.features[0].place_name
            callback(undefined, { latitude, longitude, place });
        }

    })


}

function forecast(latitude, longitude, callback) {

    const url = `https://api.darksky.net/forecast/36ae34e776ffd51bdbbf967599d5705c/${latitude},${longitude}?units=si&lang=uk`

    request({ url, json: true }, (e, {body}) => {

        if (e) {
            callback('unable to connect', undefined);

        } else if (body.error) {

            callback(body.error);

        } else {
            const { temperature, precipProbability } = body.currently
            callback(undefined,`It is ${temperature} and rain possibility ${precipProbability}%`);
        }

    });
}

function getLocation(geocodingUrl) {

    return new Promise((resolve, reject) => {
        request({ url: geocodingUrl, json: true }, (e, res) => {

            if (e) {
                reject('no connection')
                // console.log('unable to connect');
            } else if (res.body.features.length === 0) {
                reject('nothing found')
                // console.log('nothing found');

            }
            else {
                const latitude = res.body.features[0].center[1];
                const longitude = res.body.features[0].center[0]
                console.log('laitude:', latitude, 'long:', longitude);
                resolve({ latitude, longitude })

            }
        })
    })

}

module.exports = {
    geocode,
    getLocation,
    forecast
}