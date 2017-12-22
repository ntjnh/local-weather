function app() {
  const container = document.getElementById("container"),
        location = document.getElementById("location"),
        icon = document.querySelector(".weather-icon"),
        conditions = document.querySelector(".conditions"),
        celsius = document.getElementById("cel"),
        fahrenheit = document.getElementById("fah"),
        tempButtons = document.querySelector(".temp-buttons"),
        fahrenheitButton = document.querySelector(".f-button"),
        celsiusButton = document.querySelector(".c-button"),
        errorMessage = document.createElement("h3");

  // ===== Current location: ====== //
  if (navigator.geolocation) {

    function success(position) {
      // When location is successfully retrieved
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      getWeather(lat, lng);
    }

    function error() {
      // Create two elements to display error messages when location access is denied.
      const subErrorMessage = document.createElement("h4");
      errorMessage.textContent = "Unable to retrieve weather conditions.";
      subErrorMessage.textContent = "Please allow location access.";
      container.appendChild(errorMessage);
      container.appendChild(subErrorMessage);
      subErrorMessage.classList.add("error");

      // Hide the elements that hold weather info
      const weatherElements = [location, icon, conditions, celsius, fahrenheit, tempButtons];
      weatherElements.forEach(element => {
        element.classList.add("hide");
      });
    }
    navigator.geolocation.getCurrentPosition(success, error);
  } else if (!navigator.geolocation) {
    // If user's browser doesn't support geolocation
    errorMessage.textContent = "Geolocation is not supported by your browser.";
    container.appendChild(errorMessage);
  }

  // convert temp to fahrenheit
  function getFahrenheit(celsius) {
    return Math.round(celsius * 9 / 5 + 32);
  }

  // ===== Get weather icon and add it to the DOM ===== //
  function getIcon(id) {
    const iconClass = "wi-owm-" + id;
    document.getElementsByTagName("i")[0].classList.add(iconClass);
  }

  // ===== Get current weather: ====== //
  function getWeather(latitude, longitude) {
    const weatherData = "//fcc-weather-api.glitch.me/api/current?lon=" + longitude + "&lat=" + latitude;

    const weather = new XMLHttpRequest();
    weather.onreadystatechange = function() {
      if (weather.readyState === 4) {
        if (weather.status === 200) {
          // turn weather data from API into an object
          const weatherInfo = JSON.parse(weather.responseText);
          const temp = document.querySelector(".temp");

          // Add weather info to the DOM
          location.textContent = weatherInfo.name;
          temp.textContent = Math.round(weatherInfo.main.temp);
          conditions.textContent = weatherInfo.weather[0].main;
          getIcon(weatherInfo.weather[0].id);

          // Convert temperature to fahrenheit
          const fTemp = document.querySelector(".f-temp");
          fTemp.textContent = getFahrenheit(weatherInfo.main.temp);

          // Display these when the data comes through from the server
          document.querySelector(".unit").innerHTML = "&deg;C";
          fahrenheitButton.classList.remove("hide");
        } else {
          alert(weather.status);
        }
      }
    };
    weather.open("GET", weatherData);
    weather.send();
  }

  // Celsius & fahrenheit toggle
  tempButtons.addEventListener("click", function(e) {
    const tempElements = [fahrenheit, celsius, fahrenheitButton, celsiusButton];
    tempElements.forEach(el => el.classList.toggle("hide"));
  });
}

app();