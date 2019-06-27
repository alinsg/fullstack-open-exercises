import React from 'react'
import ReactDOM from 'react-dom'

const Header = props => <h1>{props.name}</h1>

const Content = props =>
  props.parts.map(part => <Part part={part} key={part.name} />)

const Total = props =>
  props.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

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
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
