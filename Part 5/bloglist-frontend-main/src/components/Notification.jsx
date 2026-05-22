const Notification = ({ message, error }) => {
  if(message === null) {
    return null
  }

  return <div style={{ color: `${error ? 'red': 'green'}` }} className="error"
  >
    {message}
  </div>


}

export default Notification