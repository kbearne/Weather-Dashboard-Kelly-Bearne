// assign API key to variable (NOT best practice - should be secured!)
const APIKey = "e42ebadb1c3fe400de41f9525c78db29";

// store current date and time (utilising day.js)
var now = dayjs();

// global variables
const searchButton = document.getElementById('search-button');
const todayEl = document.getElementById('today');
const forecastEl = document.getElementById('forecast');

// listen for a user click on the search button
searchButton.addEventListener('click', function (event) {
    // suppress normal button behaviour
    event.preventDefault();

    // get user input (city name) and store it
    let userInput = document.getElementById('search-input');
    let userInputValue = userInput.value;

    // get search history div
    const searchHistory = document.getElementById('history');

    // check that user input isn't blank; if it is then prompt them to enter valid input
    if (userInputValue.trim() === "") {
        alert("Value can't be blank, please enter something to search for!");
        return;
    } else {
        // add item to search history
        searchHistory.innerHTML += `${userInputValue}\n`;

        // call function to execute API call
        executeUserSearch(userInputValue);
    };
});

// function to execute user search (calling API results), which is passed when a user query passes from the event listener (on search button click)
function executeUserSearch(userInputValue) {
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
                .then(function (currentWeatherData) {
                    displayCurrentWeather(currentWeatherData);
                })
                .catch(function (error) {
                    console.error('API fetch operation has failed with the following error:', error);
                });
        });
};

// receives executeUserSearch functon results and outputs it onto the page for the user
function displayCurrentWeather(currentWeatherData) {
    console.log(currentWeatherData);

    // fetch icon and store in variable (later used in img URL below)
    const icon = currentWeatherData.weather[0].icon;

    // format API results (for current weather) and store in a variable. variable 'now' utilises day.js to pull todays date
    const displayCurrentWeather = `
    <h2>City name: ${currentWeatherData.name}</h2>
    <h3>Date: ${now}</h3>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <h3>Temperature: ${currentWeatherData.main.temp}</h3>
    <h3>Humidity: ${currentWeatherData.main.humidity}</h3>
    <h3>Wind speed: ${currentWeatherData.wind.speed}</h3>
    `;

    // populate todayEl with formatted output
    todayEl.innerHTML = displayCurrentWeather;
};

/* TODO: future conditions for that city

When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
    The date
    An icon representation of weather conditions
    The temperature
    The humidity

When a user clicks on a city in the search history they are again presented with current and future conditions for that city. */