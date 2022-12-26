import { Box } from '@mui/material'
import React from 'react'
import Header from '../DefaultLayout/Header/Header'

const HeaderOnlyLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Header />
      {children}
      {/* <Grid container>
        <Grid item xs={12}>
          
        </Grid>
        <Grid>
          {children}
        </Grid>
      </Grid> */}
    </Box>
  )
}

export default HeaderOnlyLayout
