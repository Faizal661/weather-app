import axios from 'axios';

const API_KEY = 'f425f1903723494665865439bfa8b5e7';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export const getWeatherByCity = async (city: string) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: city,
          appid: API_KEY,
          units: 'metric',  // Use 'imperial' for Fahrenheit
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }; 