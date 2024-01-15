/* When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history.
When a user views the current weather conditions for that city they are presented with:
    The city name
    The date
    An icon representation of weather conditions
    The temperature
    The humidity
    The wind speed
When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
    The date
    An icon representation of weather conditions
    The temperature
    The humidity
When a user clicks on a city in the search history they are again presented with current and future conditions for that city. */

// import secured OpenWeatherMap API key
import dotenv from 'dotenv';
dotenv.config();
const APIKey = process.env.API_KEY;

// base URL for API calls
const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=Bujumbura,Burundi&appid=${APIKey}`;

// We then created an Fetch call
fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        const newQueryUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKey}`

        fetch(newQueryUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                console.log(data)
            })
        // Create CODE HERE to Log the queryURL
        // Create CODE HERE to log the resulting object
        // Create CODE HERE to calculate the temperature (converted from Kelvin)
        // Create CODE HERE to transfer content to HTML
        // Hint: To convert from Kelvin to Celsius: C = K - 273.15
        // Create CODE HERE to dump the temperature content into HTML

    });