import React from 'react'

const Search = props => {
  const { onPersonSearch } = props
  return (
    <div>
      <p>
        filter numbers{' '}
        <span>
          <input onChange={onPersonSearch} />
        </span>
      </p>
    </div>
  )
}

export default Search
