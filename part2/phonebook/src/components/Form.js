import React from 'react'

const Form = props => {
  const { onFormSubmit, onInputChange } = props
  return (
    <form onSubmit={onFormSubmit}>
      <div>
        name: <input onChange={onInputChange} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  )
}

export default Form
