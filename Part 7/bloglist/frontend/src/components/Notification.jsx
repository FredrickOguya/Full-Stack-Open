import { Alert } from '@mui/material'
const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  return (
    <div>
      <Alert
        style={{ marginTop: 10, marginBottom: 10 }}
        severity={notification.type}
      >
        {notification.text}
      </Alert>
    </div>
  )
}

export default Notification
