import axios from "axios";

interface City {
  id: number;
  name: string;
  country: string;
  region?: string;
}

interface CityResponse {
  data: City[];
}

const API_KEY = "d8eeb27b2bmsh9822d3d6474219fp1b57e6jsnfbbd194d82ed";
const BASE_URL =
  "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";

export const getCitySuggestions = async (query: string): Promise<City[]> => {
  if (!query) return [];

  try {
    const response = await axios.get<CityResponse>(BASE_URL, {
      headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
      params: {
        namePrefix: query,
        limit: 5,
      },
    });

    return response.data.data.map((city: any) => ({
        id: city.id,
        name: city.name,
        country: city.country,
        region: city.region
      }));
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
    return [];
  }
};
