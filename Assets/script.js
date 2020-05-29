const currentTime = moment().format("LLL");

$(document).ready(function () {
  const apiKey = "38c345a3581d0a6698ced8db6bdcbba5";
  //=================Event listener for city input and search history==============//
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
      $(".city-btn").click(function () {
        let cityBtnText = $(this).text();
        fetchWeatherData(cityBtnText);
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
  //======================Render Forecast====================//
  function forecastData(response) {
    console.log(response);
    const iconCodeDate0 = response.list[1].weather[0].icon;
    const iconCodeDate1 = response.list[7].weather[0].icon;
    const iconCodeDate2 = response.list[15].weather[0].icon;
    const iconCodeDate3 = response.list[24].weather[0].icon;

    //===================Card n0======================//
    const forecastDate0 = moment().add(1, "days").format("LL");
    const cityWeatherIcon0 = $("<img>");
    cityWeatherIcon0.attr(
      "src",
      "http://openweathermap.org/img/w/" + iconCodeDate0 + ".png"
    );
    const Temp0 = response.list[1].main.temp;
    const humidity0 = response.list[1].main.humidity;
    $("#forecastCard0").attr("class", "forecastCard");
    $("#forecastHeader0").text(forecastDate0);
    $("#forecastHeader0").append(cityWeatherIcon0);
    $("#temp-day0").text("Temperature: " + Temp0 + "°F");
    $("#humidity-day0").text("Humidity: " + humidity0 + "%");

    //===================Card n1======================//

    const forecastDate1 = moment().add(2, "days").format("LL");
    const cityWeatherIcon1 = $("<img>");
    cityWeatherIcon1.attr(
      "src",
      "http://openweathermap.org/img/w/" + iconCodeDate1 + ".png"
    );
    const Temp1 = response.list[7].main.temp;
    const humidity1 = response.list[7].main.humidity;

    $("#forecastCard1").attr("class", "forecastCard");
    $("#forecastHeader1").text(forecastDate1);
    $("#forecastHeader1").append(cityWeatherIcon1);
    $("#temp-day1").text("Temperature: " + Temp1 + "°F");
    $("#humidity-day1").text("Humidity: " + humidity1 + "%");

    //===================Card n2======================//
    const forecastDate2 = moment().add(3, "days").format("LL");
    const cityWeatherIcon2 = $("<img>");
    cityWeatherIcon2.attr(
      "src",
      "http://openweathermap.org/img/w/" + iconCodeDate2 + ".png"
    );
    const Temp2 = response.list[15].main.temp;
    const humidity2 = response.list[15].main.humidity;

    $("#forecastCard2").attr("class", "forecastCard");
    $("#forecastHeader2").text(forecastDate2);
    $("#forecastHeader2").append(cityWeatherIcon2);
    $("#temp-day2").text("Temperature: " + Temp2 + "°F");
    $("#humidity-day2").text("Humidity: " + humidity2 + "%");

    //===================Card n3======================//
    const forecastDate3 = moment().add(4, "days").format("LL");
    const cityWeatherIcon3 = $("<img>");
    cityWeatherIcon3.attr(
      "src",
      "http://openweathermap.org/img/w/" + iconCodeDate3 + ".png"
    );
    const Temp3 = response.list[24].main.temp;
    const humidity3 = response.list[24].main.humidity;

    $("#forecastCard3").attr("class", "forecastCard");
    $("#forecastHeader3").text(forecastDate3);
    $("#forecastHeader3").append(cityWeatherIcon3);
    $("#temp-day3").text("Temperature: " + Temp3 + "°F");
    $("#humidity-day3").text("Humidity: " + humidity3 + "%");
  }
  //=====================Render CurrentDay======================//
  function renderCurrentWeather(response) {
    resetState();
    const iconCode = response.weather[0].icon;
    const currentWeather = response.weather[0].description;
    const windSpeed = response.wind.speed;
    const cityName = response.name;
    const currentHumidity = response.main.humidity;
    const currentTemperature = response.main.temp;

    $("#jumbotron").attr("class", "jumbotron-fluid");
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

  function resetState() {
    $("#jumbotron").empty();
  }
});
