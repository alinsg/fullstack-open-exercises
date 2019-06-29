import React from 'react'

const Input = props => {
  const { onButtonClick, person } = props
  return <button onClick={() => onButtonClick(person)}>delete</button>
}

const Numbers = props => {
  const { persons, onDeleteButtonClick } = props

  const renderPersons = () =>
    persons.map(person => (
      <p key={person.name}>
        {person.name} {person.number}{' '}
        <span>
          <Input onButtonClick={onDeleteButtonClick} person={person} />
        </span>
      </p>
    ))

  return (
    <React.Fragment>
      <div>{renderPersons()}</div>
    </React.Fragment>
  )
}

export default Numbers
