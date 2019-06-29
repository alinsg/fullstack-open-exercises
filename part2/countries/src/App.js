import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CountrySearchbar from './components/CountrySearchbar'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
  const [initialCountries, setInitialCountries] = useState()
  const [countries, setCountries] = useState([])
  const [countryToRender, setCountryToRender] = useState()
  const [isCountryRendering, setIsCountryRendering] = useState(false)

  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/all`).then(response => {
      setInitialCountries(response.data)
    })
  }, [])

  const handleSearchbarInputChange = event => {
    setCountries(
      initialCountries.filter(country =>
        country.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    )
  }

  const handleCountryDetails = country => {
    setIsCountryRendering(!isCountryRendering)
    setCountryToRender(country)
  }

  const renderSingleCountry = () => {
    const { name, capital, population, languages, flag } = countryToRender
    return (
      <Country
        name={name}
        capital={capital}
        population={population}
        languages={languages}
        flag={flag}
      />
    )
  }

  return (
    <React.Fragment>
      <CountrySearchbar onCountryInputHandler={handleSearchbarInputChange} />
      {isCountryRendering === false ? (
        <Countries
          countriesToRender={countries}
          onDetailsClick={handleCountryDetails}
        />
      ) : (
        <div>
          {renderSingleCountry()}
          <button onClick={() => handleCountryDetails({})}>back</button>
        </div>
      )}
    </React.Fragment>
  )
}

export default App
