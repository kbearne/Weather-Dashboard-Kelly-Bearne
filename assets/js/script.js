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

            const currentWeatherURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${data[0].lat}&lon=${data[0].lon}&appid=${APIKey}`

            fetch(currentWeatherURL)
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
    const icon = currentWeatherData.list[0].weather[0].icon;

    // format API results (for current weather) and store in a variable. variable 'now' utilises day.js to pull todays date
    const displayCurrentWeather = `
    <h3>City name: ${currentWeatherData.city.name}</h3> 
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <h4>Date: ${now}</h4>
    <h4>Temperature: ${currentWeatherData.list[0].main.temp}</h4>
    <h4>Wind speed: ${currentWeatherData.list[0].wind.speed}</h4>
    <h4>Humidity: ${currentWeatherData.list[0].main.humidity}</h4>
    `;

    // populate todayEl with formatted output
    todayEl.innerHTML = displayCurrentWeather;

    // fetch icon and store in variable (later used in img URL below)
    const icon2 = currentWeatherData.list[0].weather[0].icon;

    // format API results (for 5 day forecast) and store in a variable
    const displayFutureWeather = `
    <h3>Date: ${currentWeatherData.list[0].dt_txt}</h3> 
    <img src="https://openweathermap.org/img/wn/${icon2}@2x.png">
    <h4>Date: ${now}</h4>
    <h4>Temperature: ${currentWeatherData.list[0].main.temp}</h4>
    <h4>Wind speed: ${currentWeatherData.list[0].wind.speed}</h4>
    <h4>Humidity: ${currentWeatherData.list[0].main.humidity}</h4>
    `;

    // populate forecastEl with formatted output
    forecastEl.innerHTML = displayFutureWeather;

    // format day.js value to match syntax of returned API list dates
    const currentDate = now.format('YYYY-MM-DD');

    // store length of currentWeatherData (array results)
    let length = currentWeatherData.list.length;

    // count for dates being looped (to find first unique instance), this starts at -1 because this is the first future date
    let dateCount = -1;

    // TODO: loop and append weather to div for five day forecast
    for (let i = 0; i < length; i++) {
        // loop weather dates returned by API and format them to display only the date (to match the format of the day.js current date) and the day
        const itemWeatherDateTime = currentWeatherData.list[i].dt_txt;
        const itemWeatherDate = itemWeatherDateTime.substring(0, itemWeatherDateTime.indexOf(' '));

        // compare current date and item being looped (utilising day.js library)
        const date1 = dayjs(currentDate);
        const date2 = dayjs(itemWeatherDate)
        const dateDifference = dayjs(date1).diff(date2, 'day');

        //console.log(`Currently looping date ${itemWeatherDate} with a current date difference of ${dateDifference}`);

        // select first instances of date diff -1 > -5
        if (dateCount === dateDifference) {
            console.log(`Currently looping date ${itemWeatherDate}`);
            dateCount--;
        }

        // get currently looped date day and add one to it using find function
            // dateDifference.find();

        // if previous date (day) -1 from current date (day)
            // append first instance to forecastEl
    };
    
};

/* TODO: future conditions for that city

When a user views future weather conditions for that city they are presented with a 5-day forecast that displays:
    The date
    An icon representation of weather conditions
    The temperature
    The humidity

When a user clicks on a city in the search history they are again presented with current and future conditions for that city. */