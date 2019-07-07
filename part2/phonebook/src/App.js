import React, { useState, useEffect } from 'react'
import numberService from './services/numbers'
import './App.css'
import Numbers from './components/Numbers'
import Form from './components/Form'
import Header from './components/Header'
import Search from './components/Search'
import AddAlert from './components/Alerts/AddAlert'
import DeleteAlert from './components/Alerts/DeleteAlert'
import ErrorAlert from './components/Alerts/ErrorAlert'

const App = () => {
  const [appTitle] = useState('Phonebook')
  const [persons, setPersons] = useState([])
  const [personName, setPersonName] = useState('')
  const [personNumber, setPersonNumber] = useState('')
  const [isSearching, setSearchingState] = useState(false)
  const [matchedPersons, setMatchedPersons] = useState()
  const [updatePersonsFromDb, setUpdatePersonsFromDb] = useState(false)
  const [alertType, setAlertType] = useState('none')
  const [nameOfPersonToRemove, setNameOfPersonToRemove] = useState()
  const [errorText, setErrorText] = useState(null)

  useEffect(() => {
    numberService.getAll().then(personsFromDb => {
      setPersons(personsFromDb)
      setUpdatePersonsFromDb(false)
    })
  }, [updatePersonsFromDb])

  const timeout = () => {
    setTimeout(() => {
      setAlertType(null)
    }, 5000)
  }

  const personAlreadyAdded = personToCheck =>
    persons.some(person => person.name === personToCheck.name)

  const updatePersonNumber = personToUpdate => {
    const { name, number } = personToUpdate
    const searchedPerson = persons.filter(person => person.name === name)[0]
    const id = searchedPerson.id
    if (number !== searchedPerson.number) {
      const confirmDialog = window.confirm(
        `${name} is already added to phonebook, replace the old number with a new one?`
      )
      if (confirmDialog) {
        const newPerson = {
          name: name,
          number: number,
          id: id
        }
        numberService.update(id, newPerson).catch(error => {
          createErrorAlert()
          timeout()
        })
        setAlertType('add')
        timeout()
        setUpdatePersonsFromDb(true)
      }
    }
  }

  const createNewPersonEntry = newPerson => {
    numberService.create(newPerson).catch(error => {
      createErrorAlert()
      timeout()
    })
    setAlertType('add')
    timeout()
  }

  const addPerson = newPerson => {
    personAlreadyAdded(newPerson)
      ? updatePersonNumber(newPerson)
      : createNewPersonEntry(newPerson)
    setUpdatePersonsFromDb(true)
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

  const handleDeleteButtonClick = person => {
    const { id, name } = person
    const confirmDialog = window.confirm(`Do you want to remove ${name}`)
    if (confirmDialog) {
      numberService.remove(id).catch(error => {
        createErrorAlert()
        timeout()
      })
      setPersons(persons.filter(person => person.id !== id))
      setNameOfPersonToRemove(name)
      setAlertType('delete')
      timeout()
    }
  }

  const createErrorAlert = () => {
    setAlertType('error')
    setErrorText('Something went wrong')
  }

  const renderAlerts = () => {
    if (alertType === 'add') {
      return <AddAlert name={personName} />
    } else if (alertType === 'delete') {
      return <DeleteAlert name={nameOfPersonToRemove} />
    } else if (alertType === 'error') {
      return <ErrorAlert errorMessage={errorText} />
    } else {
      return <React.Fragment />
    }
  }

  return (
    <div>
      <Header title={appTitle} />
      {renderAlerts()}
      <Search onPersonSearch={handlePersonSearch} />
      <h2>Add a new person</h2>
      <Form
        onNameInputChange={handleNameInputChange}
        onNumberInputChange={handleNumberInputChange}
        onFormSubmit={handleFormSubmit}
      />
      <h2>Numbers</h2>
      {isSearching === false ? (
        <Numbers
          persons={persons}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      ) : (
        <Numbers
          persons={matchedPersons}
          onDeleteButtonClick={handleDeleteButtonClick}
        />
      )}
    </div>
  )
}

export default App
