##  Weather Lookup App

A browser based weather lookup.
Enter a city name to get current temperature,
humidity, wind speed, and timezone — resolved via geocoding and live forecast
APIs.

##  What It Does
- Accepts a city name and resolves it to coordinates via the Open-Meteo Geocoding API
- Fetches current temperature, relative humidity, and wind speed for those coordinates
- Displays the resolved location (city, region, country) and timezone
- Shows a loading state while requests are in flight
- Handles errors for empty input, unknown locations, and failed API requests

## Setup
No installation, build step, or API key is required. Open `index.html` in a
modern browser.

## Usage
Open `index.html`, type a city name into the input field, and select Get
Weather. For example, enter Tokyo or San Francisco. Results appear in the
result area below the form.

##  Sample Output

```text
📍 Tokyo, Tokyo (Japan)

Temperature: 18.4 °C
Humidity: 72 %
Wind Speed: 12.6 km/h
Timezone: Asia/Tokyo
```

##  Stack

HTML, CSS, JavaScript
