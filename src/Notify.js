import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Alert, Button, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'


const Notify = () => {
  const [connection, setConnection] = useState()
  const [inputText, setInputText] = useState("")
  const [orderId, setOrderId] = useState("")
  const [open, setOpen] = useState(false)

  const navigate = useNavigate()
  const url = "https://takefood-orderservice.azurewebsites.net/notifysocket"
  const accessToken = localStorage.getItem("AccessToken")

  useEffect(() => {
    if (accessToken) {
      const connect = new HubConnectionBuilder()
        .withUrl(url,
          {
            accessTokenFactory: () => accessToken
          })
        .withAutomaticReconnect()
        .build()

      setConnection(connect)
    }

  }, [])

  useEffect(() => {
    if (connection) {
      connection
        .start()
        .then(() => {
          connection.on('sendToUser', (nick, message) => {
            console.log("Nhan dc roi ne", nick, message)
            setInputText(nick)
            setOrderId(message)
            setOpen(true)
          });
        })
        .catch((error) => console.log(error));
    }
  }, [connection])

  const handleClose = () => {
    setOpen(false)
  }

  const handleClick = (id) => {
    navigate(`/store/order/detail/${id}`)
  }
  return (
    <Snackbar open={open} onClose={handleClose} autoHideDuration={5000}>
      <Alert onClose={handleClose} variant='filled' severity="info" sx={{ width: '100%' }}
        action={
          <Button color='inherit' size='small' onClick={() => handleClick(orderId)}>
            Xem ngay
          </Button>
        }>
        {inputText}
      </Alert>
    </Snackbar>

  )
}

export default Notify
