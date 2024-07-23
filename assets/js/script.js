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
