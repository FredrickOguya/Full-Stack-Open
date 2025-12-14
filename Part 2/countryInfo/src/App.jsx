import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [countries, setCountries] = useState([]);
  const [searchedCountry, setSearchedCountry] = useState('');

  // link for all countries https://studies.cs.helsinki.fi/restcountries/api/all
  //link for countries  using nme https://studies.cs.helsinki.fi/restcountries/api/name/finland
  useEffect(()=> {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all/')
       .then(response=> {
        setCountries(response.data);
       })
  },[])
  

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
            <h1>{country.name.common}</h1>
            <p>{country.capital?.join(',')}</p>
            <p>{country.area}</p>
            <p>{Object.values(country.languages?? {}).map(lang => <li key={lang}>
              {lang}
            </li>)}</p>
            <img src={country.flags.png} alt="countryFlag" />
          </li>
        )}</ul>
      
    </div>
  )
}

export default App
