import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Weather from './Weather'

const Country = props => {
  const { name, capital, population, languages, flag } = props
  const [weatherData, setWeatherData] = useState({})

  useEffect(() => {
    const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
    const getFetchUrl = () => {
      return `http://api.apixu.com/v1/current.json?key=${API_KEY}&q=${capital}`
    }
    axios.get(getFetchUrl()).then(response => {
      setWeatherData(response.data.current)
    })
  }, [capital])

  const renderLanguages = () =>
    languages.map(language => <li key={language.name}>{language.name}</li>)

  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h2>languages</h2>
      <ul>{renderLanguages()}</ul>
      <img
        src={flag}
        alt={`${name}'s flag`}
        style={{ width: '200px', height: '100px' }}
      />
      <Weather capital={capital} weatherData={weatherData} />
    </div>
  )
}

export default Country
