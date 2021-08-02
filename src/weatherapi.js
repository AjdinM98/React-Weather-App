import axios from "axios";
export const weatherApi = async(cityname) => {
    const apiUrl = 'api.openweathermap.org/data/2.5/weather?';
    const apiKey = 'd039195d06c0f716a9a8783259d9dbd3';
      try {
        const  {data} = await axios.get(`${apiUrl}q=${cityname}&appid=${apiKey}`)
        return data
      } catch (error) {
        throw error
      }
}