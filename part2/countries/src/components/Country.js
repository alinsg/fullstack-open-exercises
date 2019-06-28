import React from 'react'

const Country = props => {
  const { name, capital, population, languages, flag } = props

  const renderLanguages = () =>
    languages.map(language => <li key={language.name}>{language.name}</li>)

  return (
    <div>
      <h1>{name}</h1>
      <p>capital: {capital}</p>
      <p>population: {population}</p>
      <h2>languages</h2>
      <ul>{renderLanguages()}</ul>
      {console.log(flag)}
      <img
        src={flag}
        alt={`${name}'s flag`}
        style={{ width: '200px', height: '100px' }}
      />
    </div>
  )
}

export default Country
