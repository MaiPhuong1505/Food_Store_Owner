import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import DefaultLayout from '../../components/Layout/DefaultLayout'
import Header from '../../components/Layout/DefaultLayout/Header/Header'
import PendingStatus from '../../components/stores/PendingStatus'

const Store = () => {
  // const userId = localStorage.getItem("UserId")
  // const token = localStorage.getItem("AccessToken")
  const [isAccepted, setIsAccepted] = useState(true)
  const mainColor = "#89D5C9"

  return (
    <>
      {!isAccepted ? <><Header /><PendingStatus /></> :

        <DefaultLayout>
          <Box
            display="flex"
            justifyContent={"start"}
            flexDirection={'column'}
            padding={2}
            margin={3}
            sx={{ 
              height: 'calc(80vh - 20px)',
              backgroundColor: 'white', 
              boxShadow: '0px 0px 5px lightgrey' }}>
            <Stack
              divider={<Divider flexItem />}
              spacing={2}
            >
              <Grid container columns={16} spacing={3}>
                <Grid item xs={5}>
                  <Typography>Tên cửa hàng</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>A Milk Tea</Typography>
                  <Typography>Địa chỉ</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>Số 12 đường ABC, Hoà Khánh Bắc, Q. Liên Chiểu, TP. Đà Nẵng  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>SĐT</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>0987654321</Typography>
                  <Typography>Email</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>nva@gmail.com</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>Tên chủ sở hữu</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>Nguyễn Văn A</Typography>
                  <Typography>Số CMND/CCCD</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>123412341234</Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>Số tài khoản ngân hàng</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>4321 4321 4321</Typography>
                  <Typography>Tại ngân hàng</Typography>
                  <Typography sx={{fontWeight: 'bold'}} color={mainColor}>A Bank</Typography>
                </Grid>
              </Grid>
              <Typography>
              Cửa hàng đang có 2 món ăn
              </Typography>
              <Typography>
              Cửa hàng đang có 1 đơn hàng chưa được xử lý 
              <Link to="/store/" style={{color: mainColor, marginLeft: 20}}>Xem ngay</Link>
              </Typography>
            </Stack>
          </Box>
        </DefaultLayout>

      }
    </>
  )
}

export default Store
