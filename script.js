var apiKey = "6006bbb67ca60a0e3ed662e5aa195ac5";

function currentWeather(cityName) {


    var urlQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey + "&units=imperial";


    $.ajax({
        url: urlQuery,
        method: "GET"
    }).then(function (response) {
        console.log(urlQuery)
        console.log(response)
        $("#city-name").text(response.name)
        $("#temp").text("Temperature: " + response.main.temp + " F")
        $("#humidity").text("Humidity: " + response.main.humidity + " %")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH")
        // Calling UV Index API
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        uvIndex(longitude, latitude)
        // Calling 5-Day Forecast
    })
}

function uvIndex(longitude, latitude) {
    var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    $.ajax({
        url: uvQuery,
        method: "GET"
    }).then(function (uvResponse) {
        console.log(uvResponse)
        $("#uv-index").text("UV Index: " + uvResponse.value)
    })
}

$("#search-button").on("click", function () {
    var cityInput = $("#city-input").val()
    currentWeather(cityInput)

})