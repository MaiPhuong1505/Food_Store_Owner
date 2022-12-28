import { Box, Button } from '@mui/material'
import React from 'react'
import registerIntro from '../assets/images/registerIntroduction.png'

const RegisterIntroduction = () => {
  // const user = localStorage.getItem("user")
  // let auth = false
  // if (user != null){
  //   auth = true
  // }
  return (
    <Box sx={{ height: '100vh', width: '100vw', background: 'white', top: 0 }}>
      <Box display='flex' justifyContent='center'>
        <img src={registerIntro} style={{ marginTop: '15vh', width: '70vw', position: 'absolute', zIndex: 1 }} />
        <Button
          sx={{
            marginTop: '26vh',
            position: 'absolute', zIndex: 2,
            paddingX: 6,
            background: '#89D5C9',
            fontSize: '1.5rem',
            color: 'white',
            borderRadius: '25px',
          }}>
          ĐĂNG KÝ NGAY
        </Button>
      </Box>

    </Box>
  )
}

export default RegisterIntroduction
