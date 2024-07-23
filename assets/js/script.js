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
