import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const Button = props => {
  const { text, clickEvent } = props
  return <button onClick={clickEvent}>{text}</button>
}

const Feedback = props => {
  const { onGoodButtonClick, onNeutralButtonClick, onBadButtonClick } = props
  return (
    <div>
      <Button text='good' clickEvent={onGoodButtonClick} />
      <Button text='neutral' clickEvent={onNeutralButtonClick} />
      <Button text='bad' clickEvent={onBadButtonClick} />
    </div>
  )
}

const Statistic = props => {
  const { text, value, textAfter } = props
  return (
    <p>
      {text} {value}
      {textAfter}
    </p>
  )
}

const Statistics = props => {
  const { good, neutral, bad } = props
  const all = () => {
    return good + neutral + bad
  }
  const average = () => {
    return (good - bad) / (good + bad + neutral)
  }
  const positive = () => {
    return (good / (good + bad + neutral)) * 100
  }

  return (
    <div>
      <Statistic text='good' value={good} />
      <Statistic text='neutral' value={neutral} />
      <Statistic text='bad' value={bad} />
      <Statistic text='all' value={all()} />
      <Statistic text='average' value={average()} />
      <Statistic text='positive' value={positive()} textAfter='%' />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodReview = () => setGood(good + 1)
  const handleNeutralReview = () => setNeutral(neutral + 1)
  const handleBadReview = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Feedback
        onGoodButtonClick={handleGoodReview}
        onNeutralButtonClick={handleNeutralReview}
        onBadButtonClick={handleBadReview}
      />
      <h1>statistics</h1>
      {good || bad || neutral !== 0 ? (
        <Statistics good={good} neutral={neutral} bad={bad} />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
