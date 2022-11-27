import { Box, Grid } from '@mui/material'
import React from 'react'
import Header from './Header/Header'
import Sidebar from './Sidebar/Sidebar'

const DefaultLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      {/* <Header />
      <Sidebar />
      {children} */}
      <Header />
      <Grid sx={{ paddingTop: '10vh' }} container columns={10}>
        <Grid item xs={2}>
          <Sidebar />
        </Grid>
        <Grid item xs={8}>
          {children}
        </Grid>
      </Grid>

    </Box>
  )
}

export default DefaultLayout
