import React from 'react'

const Numbers = props => {
  const { persons } = props

  const renderPersons = () =>
    persons.map(person => (
      <p key={person.name}>
        {person.name} {person.number}
      </p>
    ))

  return (
    <React.Fragment>
      <div>{renderPersons()}</div>
    </React.Fragment>
  )
}

export default Numbers
