import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search icon.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/fully-cloud.png'
import partially_icon from '../assets/partially cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import mist_icon from '../assets/mist.png'

const Weather = () => {
  const [weatherdata,setWeatherdata] = useState(false);
  const inputRef = useRef();
  const allIcons ={
    1000: clear_icon,
    1003: partially_icon,
    1006: cloud_icon,
    1009: cloud_icon,
    1030: mist_icon,
    1063: mist_icon,
    1066: mist_icon,
    1153: drizzle_icon,
    1168: drizzle_icon,
    1171: drizzle_icon,
    1180:rain_icon,
    1183:rain_icon,
    1186:rain_icon,
    1189:rain_icon,
    1192: rain_icon,
    1195:rain_icon,

  }
  const weather_api = async(city)=>{
    if(city===""){
      alert("Enter city name")
      return;
    }
    try {
      

    const url =`https://api.weatherapi.com/v1/forecast.json?key=fab11d7bd0d349f486b135424240209&q=${city}&days=1&aqi=yes&alerts=no`;

      const response = await fetch(url);
      const data = await response.json();
      if(!response.ok){
        alert(data.error.message)
        return;
      }
      const icon = allIcons[data.current.condition.code] || clear_icon;

      setWeatherdata({
        temp:Math.floor(data.current.temp_c),
        wind: data.current.wind_kph,
        wind_dir: data.current.wind_dir,
        humidity: data.current.humidity,
        real_feel:data.current.feelslike_c,
        uv_index:data.current.uv,
        pressure:data.current.pressure_mb,
        cloud:data.current.cloud,
        dew_point:data.current.dewpoint_c,
        heat_index:data.current.heatindex_c,
        wind_chill:data.current.windchill_c,
        text:data.current.condition.text,
        data_time:data.location.localtime,
        name:data.location.name,
        region:data.location.region,
        country:data.location.country,
        icon: icon
      })
      
    } catch (error) {
      setWeatherdata(false)
      console.log("Error in fetching data")
    }
  }
 
useEffect(()=>{
weather_api("london");

},[])

  return (
    <div className='weather'>
        <div className="search">
          <div className="search-bar">
            <input ref={inputRef} type="text" placeholder='Search'/>
          <img onClick={()=>{weather_api(inputRef.current.value)}} src={search_icon} alt="" />
          </div>

            {weatherdata?<>
            
              <img src={weatherdata.icon} className='weather-img' alt="" />
         <p className="temperature">{weatherdata.temp}°c</p>
         <p className="weather-detail">{weatherdata.text}</p>
         
         <div className="location">
         <p>{weatherdata.name},</p>
         <p>{weatherdata.region},</p>
         <p>{weatherdata.country},</p>
         <p>{weatherdata.data_time}</p>
         </div>
            </>:<></>}
          
        </div>
        <div className='daywise-details'>
          <div className="days">
            {/* <p>Today</p> */}
            {/* <p>Tomorrow</p> */}
          </div>
        <div className="today-details">
        <div className="wind">
          <div className="title">Wind</div>
          <div className="content">{weatherdata.wind} kph</div>
        </div>
        <div className="humidity">
        <div className="title">Humidity</div>
        <div className="content">{weatherdata.humidity}%</div>
        </div>
        <div className="real-feal">
        <div className="title">Real feel</div>
        <div className="content">{weatherdata.real_feel}°c</div>
        </div>
        <div className="uv-index">
        <div className="title">UV index</div>
        <div className="content">{weatherdata.uv_index}</div>
        </div>
        <div className="pressure">
        <div className="title">Pressure</div>
        <div className="content">{weatherdata.pressure} mb</div>
        </div>
        <div className="cloud">
        <div className="title">Cloud</div>
        <div className="content">{weatherdata.cloud}%</div>
        </div>
        <div className="dew-point">
        <div className="title">Dew point</div>
        <div className="content">
          {weatherdata.dew_point}°c
        </div>
        </div>
        <div className="heat-index">
        <div className="title">Heat index</div>
        <div className="content">
          {weatherdata.heat_index}°c
        </div>
        </div>
        <div className="wind-chill">
        <div className="title">Wind chill</div>
        <div className="content">
        {weatherdata.wind_chill}°c
        </div>
        </div>
        </div>
        </div>

    </div>
  )
}

export default Weather