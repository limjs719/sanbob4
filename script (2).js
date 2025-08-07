
const API_KEY = '2453a20bf9d74ed194725036250708';
const BASE_URL = 'https://api.weatherapi.com/v1/current.json';

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');
const errorMessage = document.getElementById('errorMessage');
const loading = document.getElementById('loading');

// DOM elements for weather data
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const country = document.getElementById('country');
const condition = document.getElementById('condition');
const feelsLike = document.getElementById('feelsLike');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const visibility = document.getElementById('visibility');
const uv = document.getElementById('uv');
const pressure = document.getElementById('pressure');

// Event listeners
searchBtn.addEventListener('click', searchWeather);
cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Hide all sections
function hideAllSections() {
    weatherInfo.style.display = 'none';
    errorMessage.style.display = 'none';
    loading.style.display = 'none';
}

// Show loading
function showLoading() {
    hideAllSections();
    loading.style.display = 'block';
}

// Show error
function showError() {
    hideAllSections();
    errorMessage.style.display = 'block';
}

// Show weather info
function showWeatherInfo() {
    hideAllSections();
    weatherInfo.style.display = 'block';
}

// Format wind direction
function getWindDirection(degree) {
    const directions = ['북', '북동', '동', '남동', '남', '남서', '서', '북서'];
    const index = Math.round(degree / 45) % 8;
    return directions[index];
}

// Search weather function
async function searchWeather() {
    const city = cityInput.value.trim();
    
    if (!city) {
        alert('도시명을 입력해주세요.');
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&q=${encodeURIComponent(city)}&aqi=no&lang=ko`);
        
        if (!response.ok) {
            throw new Error('도시를 찾을 수 없습니다.');
        }
        
        const data = await response.json();
        displayWeatherData(data);
        
    } catch (error) {
        console.error('Error fetching weather data:', error);
        showError();
    }
}

// Display weather data
function displayWeatherData(data) {
    const { location, current } = data;
    
    // Update main weather info
    temp.textContent = Math.round(current.temp_c);
    weatherIcon.src = `https:${current.condition.icon}`;
    weatherIcon.alt = current.condition.text;
    cityName.textContent = location.name;
    country.textContent = `${location.region}, ${location.country}`;
    condition.textContent = current.condition.text;
    
    // Update weather details
    feelsLike.textContent = `${Math.round(current.feelslike_c)}°C`;
    humidity.textContent = `${current.humidity}%`;
    wind.textContent = `${current.wind_kph} km/h ${getWindDirection(current.wind_degree)}`;
    visibility.textContent = `${current.vis_km} km`;
    uv.textContent = current.uv;
    pressure.textContent = `${current.pressure_mb} mb`;
    
    showWeatherInfo();
}

// Load Seoul weather on page load
window.addEventListener('load', () => {
    cityInput.value = 'Seoul';
    searchWeather();
});
