# 02 - Weather App

A simple **Weather App** built with vanilla JavaScript that fetches real-time weather data for any city using the OpenWeatherMap API.

## Features

- Search weather by city name
- Displays city name, temperature (°C), and weather description
- Error handling for invalid or unknown cities
- Clean, responsive UI

## Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript (ES6+)
- [OpenWeatherMap API](https://openweathermap.org/api)

## How to Run

1. Clone or download the repository.
2. Open `index.html` in any modern browser.
3. The app uses a pre-configured API key — no setup needed.

> **Note:** If the API key expires, get a free one at [openweathermap.org](https://openweathermap.org) and replace it in `scriptByMe.js`.

## File Structure

```
02_weather/
├── index.html        # Main HTML structure
├── scriptByMe.js     # Core logic (API call, DOM updates, error handling)
├── script.js         # Reference/tutorial script
└── styles.css        # Styling
```

## Notes

- `scriptByMe.js` is the self-written implementation using `async/await` and `fetch`.
- `script.js` is a reference version from tutorial material.
