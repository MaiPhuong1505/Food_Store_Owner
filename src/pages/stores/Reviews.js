import { Star, StarOutline } from '@mui/icons-material'
import { Divider, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React from 'react'

const Reviews = () => {
    const orange = '#FF8357'
  return (
    <>
    <Stack
    sx={{
        margin: 3,
        backgroundColor: 'white',
        boxShadow: '0px 0px 3px grey'
    }}>
        <Box padding={2}>
            <Typography color={'grey'}>Mã đơn hàng: 4567</Typography>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <Typography>Đồ ăn rất ngon</Typography>
        </Box>
        <Divider/>
        <Box padding={2}>
            <Typography color={'grey'}>Mã đơn hàng: 4567</Typography>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <Star sx={{color: orange}}/>
            <StarOutline sx={{color: orange}}/>
            <Typography>Đồ ăn rất ngon</Typography>
        </Box>
    </Stack>
    </>
  )
}

export default Reviews
