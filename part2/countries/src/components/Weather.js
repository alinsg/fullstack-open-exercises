import React from 'react'

const Weather = props => {
  const { capital, weatherData } = props
  const { temp_c, wind_kph, wind_dir, condition } = weatherData

  return (
    <div>
      <h2>Weather in {capital}</h2>
      <p>
        <strong>temperature:</strong> {temp_c} Celsius
      </p>
      {console.log(condition)}
      <p>
        <strong>wind:</strong> {wind_kph} kph direction {wind_dir}
      </p>
    </div>
  )
}

export default Weather
