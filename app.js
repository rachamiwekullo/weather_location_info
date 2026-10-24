async function loadWeather() {
  const query = document.getElementById("locationInput").value.trim();

  if (!query) {
    document.getElementById("result").innerHTML = "Please enter a city name.";
    return;
  }

  document.getElementById("result").innerHTML = "Loading...";

  try {
    const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1`);

    if (!geoResponse.ok) {
      throw new Error(`Location lookup failed (${geoResponse.status})`);
    }

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("Location not found.");
    }

    const location = geoData.results[0];
    const name = location.name;
    const country = location.country || "";
    const admin1 = location.admin1 || "";
    const lat = location.latitude;
    const lon = location.longitude;
    const timezone = location.timezone || "N/A";

    const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m`);

    if (!weatherResponse.ok) {
      throw new Error(`Weather data fetch failed (${weatherResponse.status})`);
    }

    const weatherData = await weatherResponse.json();
    const current = weatherData.current;
    const units = weatherData.current_units;

    const temp = current.temperature_2m;
    const tempUnit = units.temperature_2m;
    const humidity = current.relative_humidity_2m;
    const humidityUnit = units.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m;
    const windUnit = units.wind_speed_10m;

    document.getElementById("result").innerHTML = `
      <h2>📍 ${name}${admin1 ? `, ${admin1}` : ""}${country ? ` (${country})` : ""}</h2>
      <p><strong>Temperature:</strong> ${temp} ${tempUnit}</p>
      <p><strong>Humidity:</strong> ${humidity} ${humidityUnit}</p>
      <p><strong>Wind Speed:</strong> ${windSpeed} ${windUnit}</p>
      <p><strong>Timezone:</strong> ${timezone}</p>
    `;
  } catch (error) {
    document.getElementById("result").innerHTML = `Error: ${error.message}`;
  }
}