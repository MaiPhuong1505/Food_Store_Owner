import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'


const ForgotPassword = () => {
  const [email, setEmail] = useState('')

  const handleSendEmail = () => {

  }
  return (
    <div style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Box
        component={Paper}
        maxWidth={500}
        minWidth={400}
        display="flex"
        flexDirection='column'
        sx={{ margin: 'auto', background: 'white', padding: 3 }}>
        <Typography variant='h5'>Tìm tài khoản của bạn </Typography>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>
        <Typography>Vui lòng nhập email để tìm kiếm tài khoản của bạn</Typography>
        <TextField
          fullWidth
          margin="normal" type={'email'}
          variant='outlined' placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        ></TextField>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>

        <Button
          onClick={handleSendEmail}
          sx={{
            borderRadius: 1,
            backgroundColor: "#89D5C9",
            fontSize: 16,
            fontStyle: "bold"
          }}
          variant="contained" >
          Tìm kiếm
        </Button>
      </Box>
    </div>

  )
}

export default ForgotPassword
