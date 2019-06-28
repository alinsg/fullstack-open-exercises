import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import CountrySearchbar from './components/CountrySearchbar'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchbarText, setSearchbarText] = useState()

  const handleSearchbarInputChange = event => {
    setSearchbarText(event.target.value)
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchbarText}`)
      .then(response => {
        console.log(response)
        setCountries(response.data)
      })
  }

  const handleCountryDetails = event => {}

  return (
    <React.Fragment>
      <CountrySearchbar onCountryInputHandler={handleSearchbarInputChange} />
      <Countries
        countriesToRender={countries}
        onDetailsClick={handleCountryDetails}
      />
    </React.Fragment>
  )
}

export default App
