import React from 'react'

const Input = props => {
  const { text, eventHandler } = props
  return (
    <div>
      {text} <input onChange={eventHandler} />
    </div>
  )
}

const Button = props => {
  const { text, type } = props
  return (
    <div>
      <button type={type}>{text}</button>
    </div>
  )
}

const Form = props => {
  const { onFormSubmit, onNameInputChange, onNumberInputChange } = props
  return (
    <form onSubmit={onFormSubmit}>
      <Input text='name: ' eventHandler={onNameInputChange} />
      <Input text='number: ' eventHandler={onNumberInputChange} />
      <Button type='submit' text='add' />
    </form>
  )
}

export default Form
