import React from 'react'

const ErrorAlert = props => {
  const { errorMessage } = props
  return (
    <div
      style={{
        border: '2px solid red',
        backgroundColor: 'gray',
        borderRadius: '5px'
      }}
    >
      <h2 style={{ color: 'red' }}>{errorMessage}</h2>
    </div>
  )
}

export default ErrorAlert
