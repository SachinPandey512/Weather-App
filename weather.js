async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "85b6686b6d7c439e84c81856250307"; 

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");
    const data = await response.json();

    const html = `
      <h3>${data.location.name}, ${data.location.country}</h3>
      <img src="${data.current.condition.icon}" alt="weather icon" />
      <p><strong>${data.current.condition.text}</strong></p>
      <p>Temperature: ${data.current.temp_c}°C</p>
      <p>Humidity: ${data.current.humidity}%</p>
      <p>Wind: ${data.current.wind_kph} kph</p>
      <p>Air Quality Index: ${data.current.air_quality.pm2_5.toFixed(2)}</p>
    `;
    document.getElementById("weatherInfo").innerHTML = html;
  } catch (error) {
    document.getElementById("weatherInfo").innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}
