import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { storeServices } from '../../services/stores.services'

const MonthBestSeller = ({ storeId, token }) => {
  const [bestSeller, setBestSeller] = useState({})
  const [isLoading, setLoading] = useState(true)

  const getBestSellingFood = async (id, month, year, token) => {
    try {
      const food = await storeServices.getBestSellingFood(id, month, year, token)
      if (food) {
        setBestSeller(food.data)
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
    getBestSellingFood(storeId, month, year, token)
  }, [])

  return (
    <Box display={'flex'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
      <Typography sx={{ marginY: 1, textAlign: 'center', fontWeight: 'bold' }}>Best-seller</Typography>
      {
        isLoading ? <CircularProgress /> :
          <>
            <div style={{ height: '25vw', width: '25vw', overflow: 'hidden' }}>
              <img src={bestSeller.urlImage}
                style={{ margin: 'auto', width: '100%' }} alt='best-seller' />
            </div>

            <Typography sx={{ marginY: 1 }}>{bestSeller.name}</Typography>
            <Typography sx={{ marginBottom: 1 }}>Số lượng: {bestSeller.quantity}</Typography>
          </>
      }

    </Box>
  )
}

export default MonthBestSeller
