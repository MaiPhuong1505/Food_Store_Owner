import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { storeServices } from '../../services/stores.services'

const MonthRevenue = ({ storeId, token }) => {
  const [monthRevenue, setMonthRevevue] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getMonthRevenue = async (id, month, year, token) => {
    try {
      const monthRevenue = await storeServices.getMonthRevenue(id, month, year, token)
      if (monthRevenue.data) {
        setMonthRevevue(monthRevenue.data)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const month = moment().month() + 1
    const year = moment().year()
    getMonthRevenue(storeId, month, year, token)
  }, [])
  return (
    <Box display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
      <Typography variant='h6'>Doanh thu tháng này</Typography>
      {isLoading ? <CircularProgress /> :
        <Typography variant='h5' sx={{ marginY: 2, fontWeight: 'bold' }}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(monthRevenue.revenue)}
        </Typography>
      }

    </Box>
  )
}

export default MonthRevenue
