var apiKey = "6006bbb67ca60a0e3ed662e5aa195ac5";

var cities = [];

var cityInput = $("#city-input").val()

// Hides info display cards until a city is searched for
$(".card").hide();
$("#5-day").hide();

// Collects city input value
function currentWeather(cityInput) {

    // Query URL
    var urlQuery = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";

    // Calling current city weather details
    $.ajax({
        url: urlQuery,
        method: "GET"
    }).then(function (response) {
        var icon = "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
        $("#city-name").text(response.name + " " + dayjs().format("YYYY-MM-DD")).append(`<img src="${icon}">`);
        $("#temp").text("Temperature: " + response.main.temp + " °F");
        $("#humidity").text("Humidity: " + response.main.humidity + " %");
        $("#wind-speed").text("Wind Speed: " + response.wind.speed + " MPH");

        // Calling UV Index API
        var longitude = response.coord.lon;
        var latitude = response.coord.lat;
        uvIndex(longitude, latitude);

        // Calling 5-Day Forecast
        var fiveDayQuery = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&appid=" + apiKey + "&units=imperial";
        $.ajax({
            url: fiveDayQuery,
            method: "GET"
        }).then(function (fiveDayResponse) {

            // Adds weather icon to each individual forecast card
            var icon = "https://openweathermap.org/img/w/" + fiveDayResponse.list[1].weather[0].icon + ".png";

            // Adds date to each individual forecast card
            var cardDate = fiveDayResponse.list[1].dt_txt
            $("#card-date1").text(cardDate.slice(0, 10)).append(`<img src="${icon}">`);

            cardDate = fiveDayResponse.list[9].dt_txt
            icon = "https://openweathermap.org/img/w/" + fiveDayResponse.list[8].weather[0].icon + ".png";
            $("#card-date2").text(cardDate.slice(0, 10)).append(`<img src="${icon}">`);

            cardDate = fiveDayResponse.list[17].dt_txt
            icon = "https://openweathermap.org/img/w/" + fiveDayResponse.list[16].weather[0].icon + ".png";
            $("#card-date3").text(cardDate.slice(0, 10)).append(`<img src="${icon}">`);

            cardDate = fiveDayResponse.list[25].dt_txt
            icon = "https://openweathermap.org/img/w/" + fiveDayResponse.list[24].weather[0].icon + ".png";
            $("#card-date4").text(cardDate.slice(0, 10)).append(`<img src="${icon}">`);

            cardDate = fiveDayResponse.list[33].dt_txt
            icon = "https://openweathermap.org/img/w/" + fiveDayResponse.list[32].weather[0].icon + ".png";
            $("#card-date5").text(cardDate.slice(0, 10)).append(`<img src="${icon}">`);

            // Adds temperature to each individual forecast card
            var cardTemp = fiveDayResponse.list[1].main.temp
            $("#card-temp1").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[9].main.temp
            $("#card-temp2").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[17].main.temp
            $("#card-temp3").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[25].main.temp
            $("#card-temp4").text(cardTemp + " °F");

            cardTemp = fiveDayResponse.list[33].main.temp
            $("#card-temp5").text(cardTemp + " °F");

            // Adds humidity to each individual forecast card
            var cardHumidity = fiveDayResponse.list[1].main.humidity
            $("#card-humidity1").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[9].main.humidity
            $("#card-humidity2").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[17].main.humidity
            $("#card-humidity3").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[25].main.humidity
            $("#card-humidity4").text("Humidity: " + cardHumidity);

            cardHumidity = fiveDayResponse.list[33].main.humidity
            $("#card-humidity5").text("Humidity: " + cardHumidity);

            // Clear input field after search initiated
            cityInput = $("#city-input").val("")
        })
    })
}

// Takes city from input field
function collectCities(cityInput) {
    pullCities();
    console.log(cities)
    if (cities.indexOf(cityInput) === -1) {
        cities.push(cityInput);
        storeCities(cities);
        createBtn();
    }
}

// Stores city in local storage
function storeCities(cities) {
    localStorage.setItem('cities', JSON.stringify(cities));
}

// Pulls cities from local storage back out
function pullCities() {
    var savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities !== null) {
        cities = savedCities;
        console.log(cities);
    }
}

// Generates a functional button for previously searched cities
function createBtn() {
    $(".form-control").empty();
    $("#saved-cities").empty();
    for (var i = 0; i < cities.length; i++) {
        var city = cities[i];
        var newBtn = $("<button>").text(city)
        $("button").addClass("newSearch");
        $("button").on("click", getData);
        $("#saved-cities").append(newBtn);
        console.log(city)
    }
}

function getData() {
    var cityName = ($(this).text());
    currentWeather(cityName)
}

// Calling the UV Index from the API
function uvIndex(longitude, latitude) {
    var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
    var uvIndex = $("#uv-index")
    $.ajax({
        url: uvQuery,
        method: "GET"
    }).then(function (uvResponse) {
        $("#uv-color").text(uvResponse.value)

        // Set color depending on uv index value
        if (uvResponse.value < 4.5) {
            $("#uv-color").css("background-color", "green")
        } else if (uvResponse.value < 9 && uvResponse.value >= 4.5) {
            $("#uv-color").css("background-color", "yellow")
        }
        else {
            $("#uv-color").css("background-color", "red")
        }
    })
}

// On page load if data exists
pullCities();
createBtn();

// Click search button to pull up weather info for specific city
$("#search-button").on("click", function () {
    $(".card").show();
    $("#5-day").show();
    var cityInput = $("#city-input").val()

    if (cityInput !== null && cityInput !== "") {
        currentWeather(cityInput);
        collectCities(cityInput);
    }
    $("#city-input").val("")
})

// Adds enter key search functionality for input field
$("form").submit(function (event) {
    event.preventDefault();
    $(".card").show();
    $("#5-day").show();
    var cityInput = $("#city-input").val();
    if (cityInput !== null && cityInput !== "") {
        currentWeather(cityInput);
        collectCities(cityInput);
    }
})