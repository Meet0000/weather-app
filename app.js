const express = require("express");
const axios = require("axios");
const app = express();

// Define the port and API key -c0912711
const PORT = process.env.PORT || 5200;
const API_KEY = "43a45c46b4e8f42a730e0b9bdc823fd4"; //My api key


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route to render the form-c0912711
app.get('/', (req, res) => {
  res.send(`
    <head>
      <title>Weather Detail</title>
      <!-- Add Bootstrap CSS from CDN -->
      <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    </head>
    <body class="container">
      <form action="/weather" method="post">
        <h1 class="my-4">Weather Detail</h1>
        <div class="form-group">
          <label for="city">Enter the city name:</label>
          <input type="text" id="city" name="city" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Get Weather</button>
      </form>
    </body>
  `);
});

// Route to handle form submission and fetch weather data-c0912711
app.post("/weather", async (req, res) => {
  const cityName = req.body.city;

  try {
    // Make a request to the OpenWeather API-c0912711
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    const weatherData = response.data;
    const temperature = weatherData.main.temp;
    const sunsetTime = new Date(weatherData.sys.sunset * 1000).toLocaleTimeString();

    // Send the weather information as a response-c0912711
    res.send(`
      <head>
        <title>Weather Details</title>
        <!-- Add Bootstrap CSS from CDN -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
      </head>
      <body class="container">
        <h1 class="my-4">Weather Details</h1>
        <h2>Weather Information for ${cityName}</h2>
        <p>Temperature: ${temperature} °C</p>
        <p>Sunset Time: ${sunsetTime}</p>
        <a href="/" class="btn btn-secondary">Check another city</a>
      </body>
    `);
  } catch (error) {
    res.status(500).send("Error fetching weather data. Please try again.");
  }
});

// Start the server-c0912711
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
