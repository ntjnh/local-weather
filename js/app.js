// ===== Current location: ====== //
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    getWeather(lat, lng);
  });
}

function errorFunction() {
  alert("Cannot get weather for your location.");
}

// converter
// to f
function getFahrenheit(celsius) {
  return Math.round(celsius * 9 / 5 + 32);
}
// to c
function getCelsius(fahrenheit) {
  return Math.round((fahrenheit - 32) * 5 / 9);
}

//icons
function getIcon(id) {
  var iconClass = "wi-owm-" + id;
  $("i").addClass(iconClass);
}

// ===== Get current weather: ====== //
function getWeather(latitude, longitude) {
  var weatherData = "//fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;
  $.getJSON(weatherData, function(weather) {
    $(".location").text(weather.name);
    $(".temp").text(Math.round(weather.main.temp));
    $(".unit").html("&deg;C");
    $(".conditions").text(weather.weather[0].main);
    $(".desc").text(weather.weather[0].description);
    
    var iconId = weather.weather[0].id;
    getIcon(iconId);
    
    //convert to fahrenheit
    $(".f-temp").text(getFahrenheit(weather.main.temp));
    $(".f-unit").html("&deg;F");
    
    // switch between celsius and fahrenheit
    $("button").click(function() {
      $("#cel").toggle();
      $(".f-button").toggle();
      $("#fah").toggle();
      $(".c-button").toggle();
    });
    
  });
}

$(".to-c").click(function() {
  var f = $(".temp").text();
  $(".temp").text(getCelsius(f));
  $(".unit").html("&deg;C");
  $(this).removeClass("to-c");
  $(this).addClass("to-f");
  $(this).html("&deg;F");
});