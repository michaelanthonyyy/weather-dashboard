var apiKey = "9975a2d1ef4e7fb59bbba6eef797ea85"
var buttonPress = $(".userSearch");
var localKey = 0;
var cityButton = $(".cityButton");
var userInput = $(".inputSearch").val().trim();

// for loop appends city from search and local storage as a button
// for (var i = 0; i < localStorage.length; i++) {


// }

buttonPress.on("click", function () {
    if (userInput = "") {
        alert("Please enter a city")
    }
    else {
        $(".forecast").empty();
        userInput = $(this).siblings(".inputSearch").val().trim();
        localStorage.setItem(localKey, userInput);
        $(".pastSearches").addClass("past-search").append("<button class= cityButton>" + userInput + "</button>");
        localKey = localKey + 1
    }

    searchWeather();
})


function searchWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var cityName = $(".forecast")
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        cityName.append("<p> <strong>" + userInput + " " + (moment().format("M/D/YY")) + "</p></strong>");
        cityName.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        cityName.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        cityName.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function (response) {
            var uvIndex = cityName.append("<p>" + "UV Index: " + response.value + "</p>")
            cityName.append(uvIndex);
        })
    })
}


console.log(localKey);
console.log(userInput);