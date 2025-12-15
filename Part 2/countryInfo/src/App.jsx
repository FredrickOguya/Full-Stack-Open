import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weatherInfo, setWeatherInfo] = useState(null);
  



  
  useEffect(()=> {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all/')
       .then(response=> {
        setCountries(response.data);
       })
  },[])

  
  useEffect(()=> {
    if(!selectedCountry)return;
    const city = selectedCountry.capital?.[0];
    if(!city)return;
    const apiKey = import.meta.env.VITE_API_KEY;
     axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
     .then(response => setWeatherInfo(response.data))
     console.log(weatherInfo);
  },[selectedCountry])

  const CountryInfo = ({country}) => {
  return (
    <div>
      <p>{country.capital?.join(',')}</p>
      <p>{country.area}</p>
      <p>{Object.values(country.languages?? {}).map(lang => (<li key={lang}>
      {lang}
      </li>))}</p>
      <img src={country.flags.png} alt="countryFlag" />
      <h2>Weather in Helsinki</h2>
      <p>{weatherInfo && (
  <div>
    <h2>Weather in {country.capital?.[0]}</h2>
    <p>Temperature: {weatherInfo.main.temp} °Celcius</p>
    <p>Wind: {weatherInfo.wind.speed} m/s</p>
    <p>Conditions: {weatherInfo.weather?.[0]?.description}</p>
    <img
      src={`https://openweathermap.org/img/wn/${weatherInfo.weather?.[0]?.icon}@2x.png`}
      alt={weatherInfo.weather?.[0]?.description}
    />
  </div>
)}
</p>
    </div>
    
  )
  }
  const handleShowButton = (country) => {
    setSelectedCountry(country)
    return (
      
      <CountryInfo country={country}/>
    )
  }
  

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(searchedCountry.toLowerCase()))       

  return (
    <div>
        <p>find countries</p>
        <input
         type="text" 
         value={searchedCountry}
         onChange={(event)=> setSearchedCountry(event.target.value)}
        />
        <ul>{searchedCountry && filteredCountries.length > 10 ? <p>Too many matches,specify another filter</p> : filteredCountries.map(country=>
          <li key={country.name.common}>
            <h1>{country.name.common}</h1><button onClick={()=>setSelectedCountry(country)}>show</button>
            {selectedCountry?.name.common === country.name.common && <CountryInfo country={country}/>}
          </li>
        )}</ul>
      
    </div>
  )
}

export default App
