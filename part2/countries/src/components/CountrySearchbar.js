import React from 'react'

const Input = props => {
  const { inputHandler } = props
  return <input type='text' onChange={inputHandler} />
}

const CountrySearchbar = props => {
  const { onCountryInputHandler } = props
  return (
    <div>
      <p>
        find countries{' '}
        <span>
          <Input inputHandler={onCountryInputHandler} />
        </span>
      </p>
    </div>
  )
}

export default CountrySearchbar
