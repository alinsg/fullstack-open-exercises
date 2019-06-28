import React from 'react'

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

  return <React.Fragment>{renderManyCountries()}</React.Fragment>
}

export default Countries
