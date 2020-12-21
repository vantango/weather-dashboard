var apiKey = "6006bbb67ca60a0e3ed662e5aa195ac5";

var urlQuery = "http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=" + apiKey;

$.ajax({
    url: urlQuery,
    method: "GET"
}).then(function (response) {
    console.log(urlQuery)


})