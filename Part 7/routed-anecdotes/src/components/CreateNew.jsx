import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/useField'

const CreateNew = ({ addAnecdote }) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addAnecdote( {
      content: content.inputProps.value, 
      author: author.inputProps.value, 
      info: info.inputProps.value, 
      votes: 0} )
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputProps}/>
        </div>
        <div>
          author
          <input {...author.inputProps} />
        </div>
        <div>
          url for more info
          <input {...info.inputProps}/>
        </div>
        <button type='submit'>create</button>
        <button
          type='button'
          onClick={() => {
          content.reset()
          author.reset()
          info.reset()
          }}>clear</button>
      </form>
    </div>
  )
}

export default CreateNew
