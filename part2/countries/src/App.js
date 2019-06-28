import React, { useState } from 'react'
import './App.css'
import CountrySearchbar from './components/CountrySearchbar'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchbarText, setSearchbarInput] = useState()

  const handleSearchbarInputChange = event => {
    setSearchbarInput(event.target.value)
  }

  return (
    <React.Fragment>
      <CountrySearchbar onCountryInputHandler={handleSearchbarInputChange} />
    </React.Fragment>
  )
}

export default App
