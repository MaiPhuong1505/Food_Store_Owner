import React, { useState } from 'react'
import { Box, Button, Divider, Paper, TextField, Typography } from '@mui/material'

const ChangePassword = () => {
  const [password, setPassword] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

  const handleChangePass = () => {

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
        <Typography variant='h5'>Thay đổi mật khẩu </Typography>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>
        <TextField
          fullWidth
          margin="normal" type={'password'}
          variant='outlined' placeholder='Nhập mật khẩu mới'
          onChange={(e) => setPassword(e.target.value)}
        ></TextField>
        <TextField
          fullWidth
          margin="normal" type={'password'}
          variant='outlined' placeholder='Xác nhận mật khẩu'
          onChange={(e) => setConfirmPass(e.target.value)}
        ></TextField>
        <Divider fullWidth sx={{ marginY: 2 }}></Divider>

        <Button
          onClick={handleChangePass}
          sx={{
            borderRadius: 1,
            backgroundColor: "#89D5C9",
            fontSize: 16,
            fontStyle: "bold"
          }}
          variant="contained" >
          Đổi mật khẩu
        </Button>
      </Box>
    </div>
  )
}

export default ChangePassword
