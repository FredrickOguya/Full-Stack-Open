import { useState } from 'react'
import Notification from './Notification'

const LoginForm = ({ handleLogin,user,message,error } ) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    handleLogin({
      username,
      password
    })
    setUsername('')
    setPassword('')
  }


  {if(user){
    return (
      <div>
        <Notification message={message} error={error}/>
      </div>
    )
  } else {
    return <div>
      <Notification message={message} error={error}/>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
        username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
          password
            <input
              type='text'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  }}




}

export default LoginForm