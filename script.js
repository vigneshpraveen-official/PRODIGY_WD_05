const apiKey = 'your API Key'; //API key

// Function to fetch weather data based on user input or geolocation
async function getWeather(location) {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL);
    const data = await response.json();

    if (response.ok) {
        displayWeather(data);
    } else {
        alert('Location not found. Please enter a valid city.');
    }
}

// Function to display the fetched weather data
function displayWeather(data) {
    const locationName = document.getElementById('locationName');
    const description = document.getElementById('description');
    const temperature = document.getElementById('temperature');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('windSpeed');

    locationName.textContent = data.name;
    description.textContent = data.weather[0].description;
    temperature.textContent = `${data.main.temp} °C`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}

// Event listener for search button
document.getElementById('searchBtn').addEventListener('click', () => {
    const locationInput = document.getElementById('locationInput').value;
    if (locationInput) {
        getWeather(locationInput);
    } else {
        alert('Please enter a city name.');
    }
});

// Optionally: Automatically detect user's location (use Geolocation API)
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => displayWeather(data))
            .catch(error => console.error('Error:', error));
    });
}
