import React from 'react'

const AddAlert = props => {
  const { name } = props
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

export default AddAlert
