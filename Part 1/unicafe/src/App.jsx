import { useState } from 'react'

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatsticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good,neutral,bad}) => {
  const all = good + neutral + bad;
  const average = all=== 0 ? 0 : (good-bad )/ all;
  const positive = all === 0 ? 0 : `${(good / all)* 100}%` 

  if (all === 0){
    return (
    <p>No feedback given</p>
    )
  }
  return ( 
    <>
    <table>
      <tbody>
        <StatsticLine text="good" value={good}/>
        <StatsticLine text="neutral" value={neutral}/>
        <StatsticLine text="bad" value={bad}/>
        <StatsticLine text="all" value={all}/>
        <StatsticLine text="average" value={average}/>
        <StatsticLine text="positive" value={positive}/>
      </tbody>
    </table>
    </>
  )
}

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);


  return (
    <>
      <h1>give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>
      <h2>Statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
