//const axios = require('axios');


// fetch('http://localhost:3000/weather?location=brovary')
//     .then(res => res.json())
//     .then(data => console.log(data))

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const forecast = document.querySelector('#forecast')

console.log(forecast);




weatherForm.addEventListener('submit', e => {
    e.preventDefault()
    const location = search.value
    if (!location)
        return  forecast.textContent = 'type location'
    console.log(location);

    forecast.textContent = 'Loading...'

    fetch(`/weather?location=${location}`)


        .then(res => res.json())
        .then(data => {
            console.log(data);

            if (data.error) {
                return forecast.textContent = data.error
            }

            console.log(data)
            forecast.textContent = `${data.place}. ${data.forecast}`
        })

})



//axios.get('/weather?location=NY').then(data => console.log(data));



