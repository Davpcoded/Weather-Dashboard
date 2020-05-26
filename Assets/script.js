const currentTime = moment().format("LLL");

$(document).ready(function () {
  const apiKey = "38c345a3581d0a6698ced8db6bdcbba5";
  //=================Event listener for city input==============//
  $("#search-button").on("click", function (e) {
    e.preventDefault();
    const cityInputValue = $("#cityInput").val();
    if (cityInputValue != "") {
      const cityButton = $("<button>");
      cityButton.text(cityInputValue);
      cityButton.addClass("city-btn");
      $("#leftCard").append(cityButton);
      $("#leftCard").append("<br>");
      $("#cityInput").focus(function () {
        $(this).val("");
      });
      fetchWeatherData(cityInputValue);
    } else {
      alert("Provide a City !");
    }
  });
  //==================AJAX Calls==================//
  function fetchWeatherData(cityInputValue) {
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/forecast?q=" +
        cityInputValue +
        "&units=imperial&APPID=" +
        apiKey,
      method: "GET",
    }).then(forecastData);
    $.ajax({
      url:
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInputValue +
        "&units=imperial&APPID=" +
        apiKey,
      method: "GET",
    }).then(renderCurrentWeather);
  }
  //======================Render DATA====================//
  function forecastData(response) {
    console.log(response);
    const forecastDate0 = moment().add(1, "days").format("LL");
    $("#forecastHeader0").text(forecastDate0);

    const forecastDate1 = moment().add(2, "days").format("LL");
    $("#forecastHeader1").text(forecastDate1);

    const forecastDate2 = moment().add(3, "days").format("LL");
    $("#forecastHeader2").text(forecastDate2);

    const forecastDate3 = moment().add(4, "days").format("LL");
    $("#forecastHeader3").text(forecastDate3);
  }

  function renderCurrentWeather(response) {
    const iconCode = response.weather[0].icon;
    const currentWeather = response.weather[0].description;
    const windSpeed = response.wind.speed;
    const cityName = response.name;
    const currentHumidity = response.main.humidity;
    const currentTemperature = response.main.temp;

    $("#city-temp").text("Temperature: " + currentTemperature + "°F");
    $("#city-humidity").text("Humidity: " + currentHumidity + "%");
    $("#city-weather").text("Description: " + currentWeather);
    $("#city-wind").text("Wind Speed: " + windSpeed + "mph");

    const cityWeatherIcon = $("<img>");
    cityWeatherIcon.attr(
      "src",
      "http://openweathermap.org/img/w/" + iconCode + ".png"
    );
    $("#jumbotron").append(cityWeatherIcon);

    const displayCityName = $("<h2>");
    displayCityName.addClass("jumbo-header");
    displayCityName.text(cityName);
    $("#jumbotron").append(displayCityName);

    const displayCurrentTime = $("<h5>");
    displayCurrentTime.addClass("current-time");
    displayCurrentTime.text(currentTime);
    $("#jumbotron").append(displayCurrentTime);
  }
});
