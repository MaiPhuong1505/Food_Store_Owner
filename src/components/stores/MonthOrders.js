import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { storeServices } from '../../services/stores.services'

const MonthOrders = ({ storeId, token }) => {

  const [monthOrders, setMonthOrders] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const getMonthOrders = async (id, startDate, endDate, token) => {
    try {
      const orders = await storeServices.getMonthOrders(id, startDate, endDate, token)
      if (orders.data) {
        setMonthOrders(orders.data.length)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")
    const startDate = moment().startOf('month').utc(true).format()
    const endDate = moment().endOf('month').utc(true).format()
    getMonthOrders(storeId, startDate, endDate, token)
  }, [])

  return (
    <Box display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
      <Typography variant='h6'>Tổng số đơn hàng</Typography>
      {isLoading ? <CircularProgress /> :
        <Typography variant='h5' sx={{ marginY: 2, fontWeight: 'bold' }}>
          {monthOrders}
        </Typography>
      }
    </Box>
  )
}

export default MonthOrders
