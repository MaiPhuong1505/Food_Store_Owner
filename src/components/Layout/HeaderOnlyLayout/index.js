import { Box, Grid } from '@mui/material'
import React from 'react'
import Header from '../DefaultLayout/Header/Header'

const HeaderOnlyLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Grid container>
        <Grid item xs={12}>
          <Header />

        </Grid>
        <Grid item xs={12}>
          {children}
        </Grid>
      </Grid>
    </Box>
  )
}

export default HeaderOnlyLayout
