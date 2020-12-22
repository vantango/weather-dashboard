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
        var fiveDayQuery = "http://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";
        $.ajax({
            url: fiveDayQuery,
            method: "GET"
        }).then(function (fiveDayResponse) {

            // Adds date to each individual forecast card
            var cardDate = fiveDayResponse.list[1].dt_txt
            $("#card-date1").text(cardDate.slice(0, 10));

            cardDate = fiveDayResponse.list[8].dt_txt
            $("#card-date2").text(cardDate.slice(0, 10));

            cardDate = fiveDayResponse.list[16].dt_txt
            $("#card-date3").text(cardDate.slice(0, 10));

            cardDate = fiveDayResponse.list[24].dt_txt
            $("#card-date4").text(cardDate.slice(0, 10));

            cardDate = fiveDayResponse.list[32].dt_txt
            $("#card-date5").text(cardDate.slice(0, 10));

            // Adds temperature to each individual forecast card
            var cardTemp = fiveDayResponse.list[1].main.temp
            $("#card-temp1").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[8].main.temp
            $("#card-temp2").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[16].main.temp
            $("#card-temp3").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[24].main.temp
            $("#card-temp4").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[32].main.temp
            $("#card-temp5").text(cardTemp + " °F");

            // Adds temperature to each individual forecast card
            var cardHumidity = fiveDayResponse.list[1].main.humidity
            $("#card-humidity1").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[8].main.humidity
            $("#card-humidity2").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[16].main.humidity
            $("#card-humidity3").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[24].main.humidity
            $("#card-humidity4").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[32].main.humidity
            $("#card-humidity5").text("Humidity: " + cardHumidity);
            console.log(fiveDayResponse)






            // for (var i = 0; i < fiveDayResponse.list.length; i++) {
            //     // const element = array[index];
            //     console.log(fiveDayResponse.list[i])
            //     // if {
            //     //     // .indexOf
            //     // }
            // }

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