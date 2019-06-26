import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = props => (
  <button onClick={props.onButtonClick}>{props.text}</button>
)

const Anecdote = props => <p>{props.text}</p>

const Votes = props => (
  <p>
    has {props.amountOfVotes === undefined ? '0' : props.amountOfVotes} votes
  </p>
)

const AnecdoteOfTheDay = props => {
  const { text, points } = props
  return (
    <div>
      <Anecdote text={text} />
      <Votes amountOfVotes={points} />
    </div>
  )
}

const App = props => {
  const { anecdotes } = props
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(
    new Array(anecdotes.length + 1)
      .join('0')
      .split('')
      .map(parseFloat)
  )
  const [anecdoteOfTheDay, setAnecdoteOfTheDay] = useState()

  const handleRandomAnecdote = () => {
    const min = 0
    const max = anecdotes.length
    return setSelected(Math.floor(Math.random() * (max - min) + min))
  }

  const handleVote = () => {
    const temp = [...points]
    temp[selected] += 1
    setAnecdoteOfTheDay(anecdotes[filterAnecdotes()])
    return setPoints(temp)
  }

  const filterAnecdotes = () => {
    let number = Number.MIN_SAFE_INTEGER
    let index = 0
    for (let i = 0; i < points.length; i++) {
      if (points[i] > number) {
        number = points[i]
        index = i
      }
    }
    return index
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} />
      <Votes amountOfVotes={points[selected]} />
      <Button text='vote' onButtonClick={handleVote} />
      <Button text='next anecdote' onButtonClick={handleRandomAnecdote} />
      <h1>Anecdote with most votes</h1>
      <AnecdoteOfTheDay
        text={anecdoteOfTheDay}
        points={points[filterAnecdotes()]}
      />
    </div>
  )
}

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
