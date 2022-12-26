import { Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/home.css'
import OrderingFoodOnline from '../assets/images/Ordering-Food-Online.jpg'
import introImageLeft from '../assets/images/introductionImage1.png'
import introImageRight from '../assets/images/introductionImage2.png'

const Home = () => {
  const navigate = useNavigate()
  const userName = localStorage.getItem("Name")
  useEffect(() => {
    if (userName) {
      navigate('/store')
    }
  })

  return (
    <Grid container className='home'>
      <Grid item xs={10}>
        <Typography className='brand-home'>Foorder</Typography>
        <Typography className='slogan'>Đồ ăn nóng giòn cùng Foorder</Typography>
      </Grid>
      <Grid item xs={2}>
        <img src={OrderingFoodOnline} alt='Main' />
      </Grid>
      <Grid item xs={12}>
        <Divider sx={{ marginTop: 1, marginBottom: '5px' }} />
      </Grid>
      <Grid item xs={6} sx={{ paddingRight: 5 }}>
        <img src={introImageLeft} alt='Introduction about mobile app' />
        <Box className='intro-text-container'>
          <Typography className='intro-title'>Đặt đồ ăn nhanh với ứng dụng di động</Typography>
          <Typography className='intro-text'>The app offers a single touch point for consumers to order food and have it delivered right to their table.</Typography>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ paddingLeft: 5 }}>
        <img src={introImageRight} alt='Introduction about website' />
        <Box className='intro-text-container'>
          <Typography className='intro-title'>Mở ngay cửa hàng trên website</Typography>
          <Typography className='intro-text'>You'll get to open your store, get your customer's orders and other things.</Typography>
        </Box>
      </Grid>
    </Grid>
  )
}

export default Home
