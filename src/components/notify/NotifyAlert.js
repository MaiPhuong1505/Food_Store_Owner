import { Snackbar, Alert } from '@mui/material'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'


const NotifyAlert = ({ open, isClose, inputText, orderId }) => {
  const [isOpen, setOpen] = useState(open)
  const handleClose = () => {
    setOpen(false)
    isClose(false)
  }
  return (
    <Snackbar open={isOpen} onClose={handleClose}>
      <Alert onClose={handleClose} variant='filled' severity="info" sx={{ width: '100%' }}>
        {inputText} : <NavLink to={`/store/order/detail/${orderId}`}>Xem ngay</NavLink>
      </Alert>
    </Snackbar>
  )
}

export default NotifyAlert
