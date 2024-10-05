import React, { useState, useEffect } from "react";
import { getWeatherByCity } from "./services/weatherService";
import { getCitySuggestions } from "./services/cityService";

interface City {
  id: number;
  name: string;
  country: string;
  region?: string;
}

const WeatherSearch: React.FC = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<any>(null);
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSearch = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
      setShowSuggestions(false);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  // Fetch city suggestions as the user types
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (city.length > 0) {
        const cityResults = await getCitySuggestions(city);
        // console.log('ggg',cityResults)
        setSuggestions(cityResults);
        setShowSuggestions(true);
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    };
    fetchSuggestions();
  }, [city]);

  return (
    <div className="flex flex-col space-y-6 relative">
      <div className="flex items-center space-x-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-700"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-700 text-white px-4 py-2 rounded-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 shadow-md transition-all"
        >
          Search
        </button>
      </div>

      {/* Autocomplete dropdown */}
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 rounded-lg mt-2 w-full max-w-md shadow-lg z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              onClick={() => {
                setCity(
                  `${suggestion.name}, ${suggestion.region || ""}, ${
                    suggestion.country
                  }`
                );
                setShowSuggestions(false);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              <div className="font-semibold">{suggestion.name}</div>
              <div className="text-sm text-gray-500">
                {suggestion.region ? `${suggestion.region}, ` : ""}
                {suggestion.country}
              </div>
            </li>
          ))}
        </ul>
      )}

      {weather && (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 ">
            {weather.name}
          </h2>
          <p className="text-gray-600 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-xl font-bold text-gray-800">
            Temperature: {weather.main.temp}°C
          </p>
        </div>
      )}
    </div>
  );
};
export default WeatherSearch;
