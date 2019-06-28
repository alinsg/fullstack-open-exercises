import React from 'react'
import Country from './Country'

const Countries = props => {
  const { countriesToRender } = props

  const renderCountries = () =>
    countriesToRender.map(country => (
      <p key={country.numericCode}>{country.name}</p>
    ))

  const renderManyCountries = () => (
    <div>
      {countriesToRender.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        renderCountries()
      )}
    </div>
  )

  const renderSingleCountry = () => {
    const { name, capital, population, languages, flag } = countriesToRender[0]
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

  const countriesRender = () => {
    return (
      <div>
        {countriesToRender.length === 1
          ? renderSingleCountry()
          : renderManyCountries()}
      </div>
    )
  }

  return <React.Fragment>{countriesRender()}</React.Fragment>
}

export default Countries
