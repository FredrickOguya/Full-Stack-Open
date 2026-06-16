import { useState } from 'react'
import Notification from './Notification'
import { Input, Button } from '@mui/material'

const LoginForm = ({ handleLogin,notification } ) => {

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


  {
    return <div>
      <Notification notification={notification}/>
      <h2>Log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <Input
            type='text'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            placeholder='username'
            sx={{ padding:1 }}
          />
        </div>
        <div>
          <Input
            type='text'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            placeholder='password'
            sx={{ padding:1 }}
          />
        </div>
        <Button type='submit' variant='contained' style={{ margin: 5 }}>login</Button>
      </form>
    </div>
  }}






export default LoginForm