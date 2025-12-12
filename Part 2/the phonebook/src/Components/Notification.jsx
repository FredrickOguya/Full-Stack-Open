const Notification = ({ message, err }) => {
  if (message === null) {
    return null
  }

  const color = err === true ? "green" : "error";

  return (
    <div className={color}>
      {message}
    </div>
  )
}

export default Notification