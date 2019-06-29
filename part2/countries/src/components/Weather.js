import React from 'react'

const Weather = props => {
  const { capital, weatherData } = props
  const { temp_c, wind_kph, wind_dir, condition } = weatherData

  const renderWeatherDetails = () => (
    <React.Fragment>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>temperature:</strong> {temp_c} Celsius
      </p>
      <img src={condition.icon} alt={`Weather in ${capital}`} />
      <p>
        <strong>wind:</strong> {wind_kph} kph direction {wind_dir}
      </p>
    </React.Fragment>
  )

  const renderLoading = () => <h3>Loading...</h3>

  return (
    <div>
      {Object.keys(weatherData).length === 0
        ? renderLoading()
        : renderWeatherDetails()}
    </div>
  )
}

export default Weather
