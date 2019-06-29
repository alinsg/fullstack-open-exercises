import React, { useState, useEffect } from 'react'
import axios from 'axios'
import numberService from './services/numbers'
import './App.css'
import Numbers from './components/Numbers'
import Form from './components/Form'
import Header from './components/Header'
import Search from './components/Search'

const App = () => {
  const [appTitle] = useState('Phonebook')
  const [persons, setPersons] = useState([])
  const [personName, setPersonName] = useState('')
  const [personNumber, setPersonNumber] = useState('')
  const [isSearching, setSearchingState] = useState(false)
  const [matchedPersons, setMatchedPersons] = useState()

  useEffect(() => {
    numberService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const personAlreadyAdded = personToCheck =>
    persons.some(person => person.name === personToCheck.name)

  const addPerson = newPerson => {
    personAlreadyAdded(newPerson)
      ? window.alert(`${newPerson.name} is already added`)
      : numberService
          .create(newPerson)
          .then(newData => setPersons(persons.concat(newData)))
  }

  const handleFormSubmit = event => {
    event.preventDefault()
    const person = {
      name: personName,
      number: personNumber
    }
    addPerson(person)
  }

  const handleNameInputChange = event => {
    setPersonName(event.target.value)
  }

  const handleNumberInputChange = event => {
    setPersonNumber(event.target.value)
  }

  const handlePersonSearch = event => {
    event.target.value !== ''
      ? setSearchingState(true)
      : setSearchingState(false)
    const searchedPeople = persons.filter(person =>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setMatchedPersons(searchedPeople)
  }

  return (
    <div>
      <Header title={appTitle} />
      <Search onPersonSearch={handlePersonSearch} />
      <h2>Add a new person</h2>
      <Form
        onNameInputChange={handleNameInputChange}
        onNumberInputChange={handleNumberInputChange}
        onFormSubmit={handleFormSubmit}
      />
      <h2>Numbers</h2>
      {isSearching === false ? (
        <Numbers persons={persons} />
      ) : (
        <Numbers persons={matchedPersons} />
      )}
    </div>
  )
}

export default App
