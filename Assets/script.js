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

  function forecastData(response) {
    const forecastData = response;
    console.log(forecastData);
  }

  function renderCurrentWeather(response) {
    console.log(response);
    const iconCode = response.weather[0].icon;
    const currentWeather = response.weather[0].main;
    const windSpeed = response.wind.speed;
    const cityName = response.name;
    const currentHumidity = response.main.humidity;
    console.log(currentHumidity);

    const cityIcon = $("<img>");
    cityIcon.attr(
      "src",
      "http://openweathermap.org/img/w/" + iconCode + ".png"
    );
    $("#rightCard").append(cityIcon);
    $("#rightCard").append("<br>");
  }
});
