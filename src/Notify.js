import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { Alert, Snackbar } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'


const Notify = () => {
  const [connection, setConnection] = useState()
  const [inputText, setInputText] = useState("")
  const [orderId, setOrderId] = useState("")
  const [open, setOpen] = useState(false)


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
  return (
    // <NotifyAlert open={open} isClose={isClose} inputText={inputText} orderId={orderId} />


    <Snackbar open={open} onClose={handleClose}>
      <Alert onClose={handleClose} variant='filled' severity="info" sx={{ width: '100%' }}
        action={
          <NavLink to={`/store/order/detail/${orderId}`}></NavLink>
        }>
        {inputText} : Xem ngay

      </Alert>
    </Snackbar>

  )
}

export default Notify
