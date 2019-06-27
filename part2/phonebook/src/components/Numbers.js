import React from 'react'

const Numbers = props => {
  const { persons } = props

  const renderPersons = () =>
    persons.map(person => <p key={person.name}>{person.name}</p>)

  return (
    <React.Fragment>
      <h2>Numbers</h2>
      <div>{renderPersons()}</div>
    </React.Fragment>
  )
}

export default Numbers
