import React from 'react'

const Header = props => <h3>{props.name}</h3>

const Content = props =>
  props.parts.map(part => <Part part={part} key={part.id} />)

const Total = props => {
  const total = props.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)
  return <p style={{ fontWeight: 'bold' }}>total of {total} exercises</p>
}

const Part = props => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Course = props => {
  const { course } = props
  const { name, parts } = course
  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course
