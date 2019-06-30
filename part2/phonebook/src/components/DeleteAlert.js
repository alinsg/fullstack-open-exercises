import React from 'react'

const DeleteAlert = props => {
  const { name } = props
  return (
    <div
      style={{
        border: '2px solid red',
        backgroundColor: 'gray',
        borderRadius: '5px'
      }}
    >
      <h2 style={{ color: 'red' }}>
        Information of {name} has been removed from server
      </h2>
    </div>
  )
}

export default DeleteAlert
