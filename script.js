var apiKey = "6006bbb67ca60a0e3ed662e5aa195ac5";

function currentWeather(cityInput) {
    var cityInput = $("#city-input").val()

    // Query URL
    var urlQuery = "http://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";

    // Calling current city weather details
    $.ajax({
        url: urlQuery,
        method: "GET"
    }).then(function (response) {
        $("#city-name").text(response.name)
        $("#temp").text("Temperature: " + response.main.temp + " °F")
        $("#humidity").text("Humidity: " + response.main.humidity + " %")
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH")

        // Calling UV Index API
        var longitude = response.coord.lon
        var latitude = response.coord.lat
        uvIndex(longitude, latitude)

        // Calling 5-Day Forecast
        var fiveDayQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey;
        $.ajax({
            url: fiveDayQuery,
            method: "GET"
        }).then(function (fiveDayResponse) {
            console.log(fiveDayResponse)
            for (var i = 0; i < fiveDayResponse.list.length; i++) {
                // const element = array[index];
                // console.log(fiveDayResponse.list[i])
                // if {
                //     // .indexOf
                // }
            }
        })
    })
}

// Calling the UV Index
function uvIndex(longitude, latitude) {
    var uvQuery = "http://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    var uvIndex = $("#uv-index")
    $.ajax({
        url: uvQuery,
        method: "GET"
    }).then(function (uvResponse) {
        // console.log(uvResponse)
        // $("#uv-index").text("UV Index: ");
        $("#uv-color").text(uvResponse.value)

        // Set color depending on uv index value
        if (uvResponse.value < 4.5) {
            $("#uv-color").css("background-color", "green")
            // console.log("#uv-index");
        } else if (uvResponse.value < 9 && uvResponse.value >= 4.5) {
            $("#uv-color").css("background-color", "yellow")
        }
        else {
            $("#uv-color").css("background-color", "red")
        }
    })
}

// Click search button to pull up weather info for specific city
$("#search-button").on("click", function () {
    var cityInput = $("#city-input").val()
    currentWeather(cityInput)
})

// Adds enter key search functionality for input field
$("form").submit(function (event) {
    event.preventDefault();
    var cityInput = $("#city-input").val();
    currentWeather(cityInput);
    // console.log(cityInput)
})