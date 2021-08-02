import axios from 'axios';
import { useEffect, useState } from 'react';



const Weather = () => {
    const[cityname,setCityname]=useState('Sarajevo');
    const[weatherData,setWeatherData]=useState(null);
    const [loading, setLoading] = useState(false);
    const apiUrl = 'http://api.weatherapi.com/v1/current.json';
    const apiKey = '6bb11152c3504d09819173250210208';


    const getWeatherData=async(city)=>{
      try {
        const data =await axios.get(`${apiUrl}?key=${apiKey}&q=${cityname}`)
        return data
      } catch (error) {
          throw error
      }
  

  }
  const getData=async()=>{
    try {
        setLoading(true);
        const weather= await getWeatherData(cityname);
        setWeatherData(weather);
        setLoading(false);


    //  const data =await axios.get(`${apiUrl}?key=${apiKey}&q=${cityname}`)
    //  .then(res=> {
    //     setTemperature(res.data.current.temp_c)
    //     setCityname(res.data.location.name)
    //     setCountry(res.data.location.country)
    //     setCondition(res.data.current.condition.text)
    //     setIcon(res.data.current.condition.icon)
    //  }
    //      )
    } catch (error) {
        console.log(error.message);
        setLoading(false);
    }
  }
  useEffect(()=>{
      getData()
  },[]);
    return ( 
        <div className="container pt-5">
        <div className="row justify-content-center ">
          <div className="col-lg-6 col-sm-12 text-center text-dark align-items-center">
            <div>
              <h3 className="mb-5">Weather App</h3>
              <form onSubmit={(e,cityname)=>{
                  e.preventDefault()
                  getData()
                  }}>
              <input class="form-control" onChange={e =>setCityname(e.target.value)} type="text" placeholder="Enter city name here" />
              <button type="button" class="btn btn-primary mt-3">Search</button>
              </form>
            </div>
            {loading ? (
                <div>loading...</div>
        ) : (
          <>
            {weatherData!==null? (
            <div className="container mt-5">
              <p className="fs-2">{weatherData.data.location.name} , {weatherData.data.location.country}</p>  
              <img  src={weatherData.data.current.condition.icon} alt="" />
              <p className="fs-3">{weatherData.data.current.condition.text} , {weatherData.data.current.temp_c} °</p>
            </div>
                   ) : null}
                   </>
                 ) }   
          </div>
        </div>
      </div>
     );
}
 
export default Weather;