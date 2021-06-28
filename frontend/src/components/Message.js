import React from 'react'
import { Alert } from 'react-bootstrap'

const Message = ({ variant, children, color }) => {
  if (!color) {
    color = 'gray'
  }

  return (
    <Alert
      style={{
        marginTop: '3rem',
        textAlign: 'center',
        fontSize: '120%',
        backgroundColor: color,
      }}
      variant={variant}
    >
      {children}
    </Alert>
  )
}

Message.defaultProps = {
  variant: 'info',
}

export default Message
