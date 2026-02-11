const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const initialState = document.getElementById('initial-state');
const loadingState = document.getElementById('loading');
const errorState = document.getElementById('error-message');

// API Endpoints
const GEOCODING_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

// Helper to update text content safely
const setText = (id, text) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
};

// Map WMO Weather Codes to Descriptions and Icons
const getWeatherDescription = (code) => {
    // Codes based on Open-Meteo WMO documentation
    const codes = {
        0: { desc: 'Clear sky', icon: 'sun' },
        1: { desc: 'Mainly clear', icon: 'sun-dim' },
        2: { desc: 'Partly cloudy', icon: 'cloud-sun' },
        3: { desc: 'Overcast', icon: 'cloud' },
        45: { desc: 'Foggy', icon: 'cloud-fog' },
        48: { desc: 'Depositing rime fog', icon: 'cloud-fog' },
        51: { desc: 'Light drizzle', icon: 'cloud-drizzle' },
        53: { desc: 'Moderate drizzle', icon: 'cloud-drizzle' },
        55: { desc: 'Dense drizzle', icon: 'cloud-drizzle' },
        56: { desc: 'Light freezing drizzle', icon: 'snowflake' },
        57: { desc: 'Dense freezing drizzle', icon: 'snowflake' },
        61: { desc: 'Slight rain', icon: 'cloud-rain' },
        63: { desc: 'Moderate rain', icon: 'cloud-rain' },
        65: { desc: 'Heavy rain', icon: 'cloud-lightning' },
        66: { desc: 'Light freezing rain', icon: 'snowflake' },
        67: { desc: 'Heavy freezing rain', icon: 'snowflake' },
        71: { desc: 'Slight snow fall', icon: 'snowflake' },
        73: { desc: 'Moderate snow fall', icon: 'snowflake' },
        75: { desc: 'Heavy snow fall', icon: 'snowflake' },
        77: { desc: 'Snow grains', icon: 'snowflake' },
        80: { desc: 'Slight rain showers', icon: 'cloud-rain' },
        81: { desc: 'Moderate rain showers', icon: 'cloud-rain' },
        82: { desc: 'Violent rain showers', icon: 'cloud-lightning' },
        85: { desc: 'Slight snow showers', icon: 'snowflake' },
        86: { desc: 'Heavy snow showers', icon: 'snowflake' },
        95: { desc: 'Thunderstorm', icon: 'cloud-lightning' },
        96: { desc: 'Thunderstorm with heavy hail', icon: 'cloud-hail' },
        99: { desc: 'Thunderstorm with heavy hail', icon: 'cloud-hail' },
    };

    return codes[code] || { desc: 'Unknown', icon: 'help-circle' };
};

const getBackgroundGradient = (temp) => {
    if (temp < 0) {
        return 'linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%)'; // Freezing: Very Dark Blue
    } else if (temp < 10) {
        return 'linear-gradient(135deg, #0f172a 0%, #1d4ed8 100%)'; // Cold: Dark Blue
    } else if (temp < 20) {
        return 'linear-gradient(135deg, #0c4a6e 0%, #0284c7 100%)'; // Mild: Deep Blue/Teal
    } else if (temp < 30) {
        return 'linear-gradient(135deg, #7c2d12 0%, #c2410c 100%)'; // Warm: Dark Orange/Rust
    } else {
        return 'linear-gradient(135deg, #881337 0%, #be123c 100%)'; // Hot: Deep Red
    }
};

const fetchWeather = async (city) => {
    if (!city) return;

    // UI Updates: Show loading, hide others
    initialState.classList.add('hidden');
    weatherDisplay.classList.add('hidden');
    errorState.classList.add('hidden');
    loadingState.classList.remove('hidden');

    try {
        // Step 1: Geocoding
        const geoResponse = await fetch(`${GEOCODING_API_URL}?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('City not found');
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Step 2: Weather Data
        // Requesting current weather with temperature, relative humidity, apparent temperature, precipitation, rain, showers, snowfall, weather code, cloud cover, wind speed
        // Step 2: Weather Data
        const weatherUrl = `${WEATHER_API_URL}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,surface_pressure`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        if (weatherData.error) {
            throw new Error('Weather data unavailable');
        }

        const current = weatherData.current;

        // Dynamic Background
        const gradient = getBackgroundGradient(current.temperature_2m);
        document.documentElement.style.setProperty('--bg-gradient', gradient);

        // Step 3: Update UI
        setText('city-name', `${name}, ${country}`);

        // Date Formatting
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        setText('current-date', now.toLocaleDateString('en-US', options));

        setText('temperature', Math.round(current.temperature_2m));
        setText('feels-like', `${Math.round(current.apparent_temperature)}°C`);
        setText('humidity', `${current.relative_humidity_2m}%`);
        setText('wind-speed', `${current.wind_speed_10m} km/h`);
        setText('elevation', `${weatherData.elevation} m`);

        // Weather Icon & Description
        const weatherInfo = getWeatherDescription(current.weather_code);
        setText('weather-description', weatherInfo.desc);

        // Update Lucide Icon
        const iconEl = document.getElementById('weather-icon');
        iconEl.setAttribute('data-lucide', weatherInfo.icon);
        lucide.createIcons(); // Re-render icons

        // Show Result
        loadingState.classList.add('hidden');
        weatherDisplay.classList.remove('hidden');

    } catch (error) {
        console.error(error);
        loadingState.classList.add('hidden');
        errorState.classList.remove('hidden');
        setText('error-text', error.message === 'City not found' ? `Could not find "${city}". Please try another location.` : 'Unable to fetch weather data. Please try again later.');
    }
};

// Event Listeners
searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) fetchWeather(city);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});
