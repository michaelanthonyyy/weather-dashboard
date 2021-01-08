var apiKey = "9975a2d1ef4e7fb59bbba6eef797ea85"
var buttonPress = $(".userSearch");
var localKey = 0;
var currentWeather = "";
var fiveWeather = "";
var cityButton = $(".cityButton");



// for loop appends to search for a city section
for (var i = 0; i < localStorage.length; i++) { 
    var storedCity = localStorage.getItem(i);
    $(".pastSearches").addClass("past-search").append("<button class= cityButton>" + storedCity + "</button>");    
}

buttonPress.on("click", function () {
// set form data to local storage on button press
// run function to search weather at the end of button press
})


function searchWeather () {
    var queryURL = "api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + apiKey + "&units=imperial";

    $.ajax ({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
    })
}