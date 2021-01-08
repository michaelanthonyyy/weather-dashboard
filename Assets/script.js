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
        userInput = $(this).siblings(".inputSearch").val().trim();
        localStorage.setItem(localKey, userInput);
        $(".pastSearches").addClass("past-search").append("<button class= cityButton>" + userInput + "</button>");
    }
    
    searchWeather();
})


function searchWeather() {
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // print current date using moment.js
        var cityName = $(".forecast")
        cityName.append("<p>" + userInput + "</p>");
        cityName.append("<p>" + "Temperature: " + response.main.temp + "</p>");
        cityName.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        cityName.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
    })
}


console.log(localKey);
console.log(userInput);