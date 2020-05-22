$(document).ready(function () {
  const apiKey = "38c345a3581d0a6698ced8db6bdcbba5";
  //=================Event listener for city input==============//
  $("#search-button").on("click", function (e) {
    e.preventDefault();
    let cityInputValue = $("#cityInput").val();
    if (cityInputValue != "") {
      const queryURL =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        cityInputValue +
        "&units=metric&APPID=" +
        apiKey;
      const newButton = $("<button>");
      newButton.text(cityInputValue);
      newButton.addClass("city-btn");
      $("#leftCard").append(newButton);
      $("#leftCard").append("<br>");
      $("#cityInput").focus(function () {
        $(this).val("");
      });
      fetchWeatherData(queryURL);
    } else {
      alert("Provide a city");
    }
  });

  function fetchWeatherData(queryURL) {
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(processWeatherData);
  }

  function processWeatherData(response) {
    console.log(response);
  }
});
