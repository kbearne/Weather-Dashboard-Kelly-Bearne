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

// assign API key to variable (NOT best practice - should be secured!)
const APIKey = "e42ebadb1c3fe400de41f9525c78db29";

// global variables
const searchButton = document.getElementById('search-button');

// listen for a user click on the search button
searchButton.addEventListener('click', function (event) {
    // suppress normal button behaviour
    event.preventDefault();

    // get user input (city name) and store it
    let userInput = document.getElementById('search-input');
    let userInputValue = userInput.value;

    // check that user input isn't blank
    if (userInputValue.trim() === "") {
        alert("Value can't be blank, please enter something to search for!");
        return;
    } else {
        // call function to execute API call
        callAPI(userInputValue);
    };
});


function callAPI(userInputValue) {
    // base URL for API calls
    const queryURL = `http://api.openweathermap.org/geo/1.0/direct?q=${userInputValue}&appid=${APIKey}`;

    // API fetch call
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
                .catch(function (error) {
                    console.error('API fetch operation has failed with the following error:', error);
                });
            // Create CODE HERE to Log the queryURL
            // Create CODE HERE to log the resulting object
            // Create CODE HERE to calculate the temperature (converted from Kelvin)
            // Create CODE HERE to transfer content to HTML
            // Hint: To convert from Kelvin to Celsius: C = K - 273.15
            // Create CODE HERE to dump the temperature content into HTML

        });
};