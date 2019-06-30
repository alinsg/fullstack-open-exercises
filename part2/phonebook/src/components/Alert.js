import React from 'react'

const renderSuccessfulAlert = name => {
  return (
    <div
      style={{
        border: '2px solid green',
        backgroundColor: 'gray',
        borderRadius: '5px'
      }}
    >
      <h2 style={{ color: 'green' }}>Added {name}</h2>
    </div>
  )
}

const renderUnsuccessfulAlert = name => {
  return (
    <div
      style={{
        border: '2px solid red',
        backgroundColor: 'gray',
        borderRadius: '5px'
      }}
    >
      <h2 style={{ color: 'red' }}>
        Information of {name} has already been removed from server
      </h2>
    </div>
  )
}

const Alert = props => {
  const { name, alertType } = props
  return (
    <React.Fragment>
      {alertType === 'success'
        ? renderSuccessfulAlert(name)
        : renderUnsuccessfulAlert(name)}
    </React.Fragment>
  )
}

export default Alert
