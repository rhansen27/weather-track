const apiKey = "";
let cityInfo;
const searchHistoryList = [];
const storedHistory = JSON.parse(localStorage.getITem("search=jistory")) || [];
let selectedCity;
let dayList = [];

async function fetchCityInfo(city) {
  clearPage();
  selectedCity = city;
  try {
    const response = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${1}&appid=${apiKey}`
    );

    const data = await response.json();
    fetchWeatherInfo(data[0].lat, data[0].lon);
  } catch {
    throw new Error("error");
  }
}

async function fetchWeatherInfo(lat, lon) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const data = await response.json();

    const currentCity = {
      name: data.city.name,
      country: data.city.country,
      forecast: [],
      hunidity: data.list[0].main.humidity + "%",
      temp: Math.floor(data.list[0].main.temp - 273.15) * 1.8 + 32 + "°F",
      wind: data.list[0].wind.speed + "MPH",
    };

    let confirmedDay = 1;

    for (let i = 0; i < data.list.length; i++) {
      if (
        !dayList.includes(dara.list[i].dt_txt.replace(/\s\d+:\d+:\d+/g, ""))
      ) {
        currentCity.forecast[`day${confirmedDay}`] = [
          {
            temp:
              Math.floor((data.list[i].main.temp - 273.15) * 1.8 + 32) + "°F",
            humidity: data.list[i].main.humidity + "%",
            wind: data.list[i].wind.speed + "MPH",
            icon: data.list[i].weather[0].icon,
            date: data.list[i].dt_txt.replace(/\s\d+:\d+:\d+/g, ""),
          },
        ];

        dayList.push(data.list[i].dt_txt.replace(/\s\d+:\d+:\d+/g, ""));
        confirmedDay++;
      }
    }

    dayList = [];
    cityInfo = currentCity;
    displayForecast();
  } catch {
    throw new Error("error");
  }
}

function displayForecast() {
  const today = cityInfo.forecast.day1[0];
  const forecastContainer = document.querySelector("#forecast-display");
  const currentDayDisplay = document.querySelector("#info-display");

  const cityInfoDiv = document.createElement("div");
  const city = document.createElement("h2");
  const cityDate = document.createElement("h2");
  const cityIcon = document.createElement("img");

  const cityTemp = document.createElement("p");
  const cityWind = document.createElement("p");
  const cityHumidity = document.createElement("p");

  currentDayDisplay.appendChild(cityInfoDiv);
  cityInfoDiv.appendChild(city);
  cityInfoDiv.appendChild(cityDate);
  cityInfoDiv.appendChild(cityIcon);

  currentDayDisplay.appendChild(cityTemp);
  currentDayDisplay.appendChild(cityWind);
  currentDayDisplay.appendChild(cityHumidity);

  cityInfoDiv.classList.add("flex-container", "temp");
  city.classList.add("temp");
  cityDate.classList.add("temp");
  cityIcon.classList.add("temp");
  city.classList.add("city-name");
  cityDate.classList.add("city-date");
  cityIcon.classList.add("city-icon");
  cityWind.classList.add("temp");
  cityHumidity.classList.add("temp");
  cityDate.textContent = `(${dayjs(today.date).$M}/${dayjs(today.date).$D}/${
    dayjs(today.date).$y
  })`;
  cityIcon.src = `https://openweathermap.org/img/wn/${
    today.icon.replace("n", "d") || today.icon
  }@2x.png`;
  cityTemp.textContent = "Temp: " + today.temp;
  cityWind.textContent = "Wind: " + today.wind;
  cityHumidity.textContent = "Humidity: " + today.humidity;
  city.textContent = cityInfo.name;

  for (const info in cityInfo.forecast) {
    for (const weather of cityInfo.forecast[info]) {
      if (info == "day1") {
      } else {
        const infoPanel = document.createElement("div");
        const date = document.createElement("h2");
        const icon = document.createElement("img");
        const temp = document.createElement("p");
        const wind = document.createElement("p");
        const humidity = document.createElement("p");

        infoPanel.classList.add("forecast-container", "temp");
        date.classList.add("forecast-header", "temp");
        icon.classList.add("forecast-icon", "temp");
        temp.classList.add("forecast-txt", "temp");
        wind.classList.add("forecast-txt", "temp");
        humidity.classList.add("forecast-txt", "temp");

        forecastContainer.appendChild(infoPanel);
        infoPanel.appendChild(date);
        infoPanel.appendChild(icon);
        infoPanel.appendChild(temp);
        infoPanel.appendChild(wind);
        infoPanel.appendChild(humidity);

        date.textContent = `${dayjs(weather.date).$M}/${
          dayjs(weather.date).$D
        }/${dayjs(weather.date).$y}`;
        icon.src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;
        temp.textContent = "Temp: " + weather.temp;
        wind.textContent = "Wind: " + weather.wind;
        humidity.textContent = "Humidity: " + weather.humidity;
      }
    }
  }
}
