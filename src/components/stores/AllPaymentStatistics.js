import { CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import PaymentStatistic from '../../components/stores/PaymentStatistic'
import { useLocation } from 'react-router-dom';
const AllPaymentStatistics = () => {

  // const { state } = useLocation();
  // const { id } = state;
  const id = localStorage.getItem("StoreId")

  return (
    <Box sx={{ margin: 1 }}>
      <Grid container>
        <Grid item xs={12} component={Paper} sx={{ padding: 2 }}>
          <Typography variant='h6' sx={{ textAlign: 'center' }}>Chi tiết doanh thu</Typography>
          <Stack >
            <Divider sx={{ marginY: 3 }} />
            <PaymentStatistic payment={'All'} storeId={id} />
            <Divider variant="middle" sx={{ marginY: 2 }} />
            <PaymentStatistic payment={'Tien mat'} storeId={id} />
            <Divider variant="middle" sx={{ marginY: 2 }} />
            <PaymentStatistic payment={'Paypal - Thanh toán thành công'} storeId={id} />
            <Divider variant="middle" sx={{ marginY: 2 }} />
            <PaymentStatistic payment={'Paypal - Thanh toán không thành công'} storeId={id} />
            <Divider variant="middle" sx={{ marginY: 2 }} />
            <PaymentStatistic payment={'Paypal - Chưa thanh toán'} storeId={id} />
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default AllPaymentStatistics
