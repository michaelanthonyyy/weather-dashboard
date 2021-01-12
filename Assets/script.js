var apiKey = "9975a2d1ef4e7fb59bbba6eef797ea85"
var buttonPress = $(".userSearch");
var localKey = 0;
var userInput;
var cityButton = $(".cityButton");


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
    // Search button function to add search to local storage, create new buttons for those cities and to run 
    // searchWeather() function that appends the data to the page
})

$(document).on("click", ".cityButton", function () {
    $(".forecast").empty();
    userInput = ($(this).text());
    searchWeather()
// on click function for dynamically created buttons from previous searches
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
      
        $(".currentWeather").append("<p> <strong>" + userInput + " " + (moment().format("MM/DD/YY")) + "</p></strong>");
        cityName.append("<img id='weatherIcon'>");
        $("#weatherIcon").attr("src", "http://openweathermap.org/img/wn/"+ response.weather[0].icon + ".png");
        cityName.append("<p>" + "Temperature: " + response.main.temp + " °F</p>");
        cityName.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
        cityName.append("<p>" + "Wind Speed: " + response.wind.speed + "</p>");
        $.ajax({
            url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey,
            method: "GET"
        }).then(function (response) {
            var uvIndex = cityName.append("<p>" + "UV Index: " + response.value + "</p>");
            cityName.append(uvIndex);
        })
        $(".columnOne").empty();
        $(".columnTwo").empty();
        $(".columnThree").empty();
        $(".columnFour").empty();
        $(".columnFive").empty();
        fiveDayForecast();
    })
}

function fiveDayForecast() {
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&units=imperial&appid=" + apiKey
    var columnOne = $(".columnOne");
    var columnTwo = $(".columnTwo");
    var columnThree = $(".columnThree");
    var columnFour = $(".columnFour");
    var columnFive = $(".columnFive");

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        columnOne.append("<p>" + "<strong>" + (moment().format("M/DD/YY")) + "</strong>");
        columnOne.append("<img id='image1'>");
        $("#image1").attr("src", "http://openweathermap.org/img/wn/"+ response.list[0].weather[0].icon + ".png");
        columnOne.append("<p>" + "Temperature: <br>" + response.list[0].main.temp + " °F</p>");
        columnOne.append("<p>" + "Humidity: " + response.list[0].main.humidity + "</p>");

        columnTwo.append("<p>" + "<strong>" + (moment().add(1, 'days').format("M/DD/YY")) + "</strong>");
        columnTwo.append("<img id='image2'>");
        $("#image2").attr("src", "http://openweathermap.org/img/wn/"+ response.list[1].weather[0].icon + ".png");
        columnTwo.append("<p>" + "Temperature: <br>" + response.list[1].main.temp + " °F</p>");
        columnTwo.append("<p>" + "Humidity: " + response.list[1].main.humidity + "</p>");

        columnThree.append("<p>" + "<strong>" + (moment().add(2, 'days').format("M/DD/YY")) + "</strong>"); 
        columnThree.append("<img id='image3'>");
        $("#image3").attr("src", "http://openweathermap.org/img/wn/"+ response.list[2].weather[0].icon + ".png");
        columnThree.append("<p>" + "Temperature: <br>" + response.list[2].main.temp + " °F</p>");
        columnThree.append("<p>" + "Humidity: " + response.list[2].main.humidity + "</p>");

        columnFour.append("<p>" + "<strong>" + (moment().add(3, 'days').format("M/DD/YY")) + "</strong>");
        columnFour.append("<img id='image4'>");
        $("#image4").attr("src", "http://openweathermap.org/img/wn/"+ response.list[3].weather[0].icon + ".png");
        columnFour.append("<p>" + "Temperature: <br>" + response.list[3].main.temp + " °F</p>");
        columnFour.append("<p>" + "Humidity: " + response.list[3].main.humidity + "</p>");

        columnFive.append("<p>" + "<strong>" + (moment().add(4, 'days').format("M/DD/YY")) + "</strong>"); 
        columnFive.append("<img id='image5'>");
        $("#image5").attr("src", "http://openweathermap.org/img/wn/"+ response.list[4].weather[0].icon + ".png");
        columnFive.append("<p>" + "Temperature: <br>" + response.list[4].main.temp + " °F</p>");
        columnFive.append("<p>" + "Humidity: " + response.list[4].main.humidity + "</p>");
    })

}