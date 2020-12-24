# Weather Dashboard

## Project Description
I built a weather dashboard that takes the user's city of choice into the input field. Once the user presses the search button or hits the enter key, the current weather data, including the temperature, humidity, wind speed, and UV index, and weather icon, is generated onto the main card. Additionally, it also generates the five day forecast onto individual cards with the date, weather icon, temperature, and humidity for each of those days. The city is then stored in local storage and generated into a button that the user can reference to later if they want to pull up a previously searched city.

### Table of Contents

#### Technologies Used
* jQuery
* AJAX
* API's
* Javascript
* HTML
* CSS
* Bootstrap

#### Processes
* I built the Bootstrap grid system search input, and display cards.
* Added jQuery and AJAX links as well as the OpenWeather API with key for functionality.
* Created both a button click and submit function that trigger the search function.
* Built a function that appends the requested data types to each specified ID.
* The five day forecast is generated but running through the specified index of the first five days within the OpenWeatherMap 5-Day forecast API.
* Created a conditional that specifies the color for the UV Index to green, yellow, or red depending on the value within specified ranges.
* Added multiple functions that store each city entered by user and generates them into a button so that they can be called back at a later time to be searched again.

#### Deployment
https://vantango.github.io/weather-dashboard/


#### Repository
https://github.com/vantango/weather-dashboard

![weather-dashboard-screenshot](https://github.com/vantango/weather-dashboard/blob/main/images/weather-dashboard.png?raw=true)