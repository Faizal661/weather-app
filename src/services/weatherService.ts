import axios from 'axios';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY ;
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city: string) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: WEATHER_API_KEY,
          units: 'metric',  // Use 'imperial' for Fahrenheit
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }; 