var apiKey = "9975a2d1ef4e7fb59bbba6eef797ea85"
var buttonPress = $(".userSearch");
var localKey = 0;
var userInput = $(".inputSearch").val().trim();
var cityButton = $(".cityButton");



buttonPress.on("click", function () {
    if (userInput = "") {
        alert("Please enter a city")
    }
    else {
        $(".forecast").empty();
        userInput = $(this).siblings(".inputSearch").val().trim().toUpperCase();
        localStorage.setItem(localKey, userInput);
        $(".pastSearches").addClass("past-search").append("<button class= cityButton>" + userInput + "</button> <br>");
        localKey = localKey + 1
        $(".inputSearch").empty();
    }

    searchWeather();
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

cityButton.on("click", "button", function () {
    $(".forecast").empty();
    userInput.val($(this).text());
    searchWeather()
})


// function fiveDayForecast() { 
//     var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + apiKey
    
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         var five = $(".fiveDay");
//         five.append("<p>" + response.list.main.temp + "</p>");
//     })
// }

// console.log(localKey);
// console.log(userInput);