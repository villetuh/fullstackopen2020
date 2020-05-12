# Country information application

Application shows to user information about selected country. Information is fetched using <https://restcountries.eu> REST API. In addition to country related information, weather information for it's capital is displayed if required configuration is provided. Weather data is provided by <https://openweathermap.org/>.

## Weather data configuration

For weather data to work REACT_APP_OPEN_WEATHER_MAP_API_KEY environmental variable needs to contain API key for the Open Weather Map API.
