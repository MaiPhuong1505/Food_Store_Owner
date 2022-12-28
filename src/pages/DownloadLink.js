import { Box, Button } from '@mui/material'
import React from 'react'
import downloadLink from '../assets/images/downloadLink.png'
const DownloadLink = () => {
  return (
    <>
      <Box display='flex' mt={10} justifyContent='center'>
        <img src={downloadLink} style={{ width: '70vw', position: 'absolute', zIndex: 1 }} />
      </Box>
      <Button
        sx={{
          marginTop: '60vh', marginLeft: '15vw',
          position: 'absolute', zIndex: 2,
          paddingX: 6,
          background: 'white',
          fontSize: '2rem',
          color: '#89D5C9',
          borderRadius: '15px',
          boxShadow: '5px 5px'
        }}>
        TẢI APP NGAY
      </Button>
    </>
  )
}

export default DownloadLink
