var apiKey = "9975a2d1ef4e7fb59bbba6eef797ea85"
var buttonPress = $(".userSearch");
var localKey = 0;
var userInput;
var cityButton = $(".cityButton");
var five = $(".fiveDay");


buttonPress.on("click", function () {
    userInput = $(".inputSearch").val().trim();
    if (userInput === "") {
        alert("Please enter a city")
    }
    else {
        $(".forecast").empty();
        userInput = $(this).siblings(".inputSearch").val().trim().toUpperCase();
        localStorage.setItem(localKey, userInput);
        $(".pastSearches").addClass("past-search").append("<button class= cityButton>" + userInput + "</button> <br>");
        localKey = localKey + 1
        $(".inputSearch").val("");
    }
    searchWeather();
})

$(document).on("click", ".cityButton", function () {
    $(".forecast").empty();
    userInput = ($(this).text());
    searchWeather()

})


function searchWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var cityName = $(".forecast");
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        $(".currentWeather").empty();
        five.empty();
        $(".currentWeather").append("<p> <strong>" + userInput + " " + (moment().format("MM/MD/YY")) + "</p></strong>");
        cityName.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        cityName.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        cityName.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function (response) {
            var uvIndex = cityName.append("<p>" + "UV Index: " + response.value + "</p>");
            cityName.append(uvIndex);
        })
        fiveDayForecast();
    })
}

function fiveDayForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=" + apiKey

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        for (i = 0; i < 5; i++) {
            // five.append("<container class=> </container")
            // var row = $("<div class=row> </div>")
            // // row then five to column
            five.append("<p>" + "Temp: " + response.list[i].main.temp + "</p>");
            five.append("<p>" + "Humidity: " + response.list[i].main.humidity + "% </p>");
        }
    })
}
// Change format of html to properly display five day weather forecast?
// Possibly use card deck?


// console.log(localKey);
// console.log(userInput);