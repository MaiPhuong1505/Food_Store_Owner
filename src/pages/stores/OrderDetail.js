import React from 'react'
import { Stack, Box } from '@mui/system'
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Button, Grid, CircularProgress, Snackbar, Alert
} from '@mui/material';
import { AccountCircle, CalendarMonth, LocalShipping, LocationOn } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { storeServices } from '../../services/stores.services';


const OrderDetail = () => {
  const { id } = useParams()
  const token = localStorage.getItem("AccessToken")
  const orderStatus = [
    { eng: 'Ordered', viet: 'Đơn hàng mới' },
    { eng: 'Processing', viet: 'Đã xác nhận' },
    { eng: 'Delivering', viet: 'Đang giao hàng' },
    { eng: 'Delivered', viet: 'Đã giao hàng' },
  ]

  const nextStatus = (status) => {
    var text = ''
    switch (status) {
      case 'Ordered':
        text = 'Processing'
        break;
      case 'Processing':
        text = 'Delivering'
        break;
      case 'Delivering':
        text = 'Delivered'
        break;
    }
    return text
  }

  const [detail, setDetail] = useState({})
  const [updateStatus, setUpdateStatus] = useState('')
  const [isLoading, setLoading] = useState(true)
  const [isOpen, setOpen] = useState(false)

  const getOrderDetail = async (orderId, token) => {
    try {
      const orderDetail = await storeServices.getOrderDetail(orderId, token)
      if (orderDetail.data) {
        setDetail(orderDetail.data)
        setUpdateStatus(orderDetail.data.Status)
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrderDetail(id, token)
  }, [])

  // useEffect(() => {

  // }, [updateStatus])

  const mainColor = '#89D5C9'

  const handleChangeStatus = async (nextStatus) => {
    const msg = orderStatus.find(x => x.eng === nextStatus).viet
    if (window.confirm(`Bạn muốn chuyển trạng thái đơn hàng thành "${msg}"?`)) {
      try {
        const response = await storeServices.updateOrderStatus(id, nextStatus, token)
        if (response) {
          setUpdateStatus(nextStatus)
          setOpen(true)
        }
      } catch (error) {
        console.error(error);
      }
    } else return
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Stack
        spacing={2} sx={{
          margin: 3,
          backgroundColor: 'white',
          boxShadow: '0px 0px 3px grey'
        }}>
        {
          isLoading ? (
            <div style={{ alignSelf: 'center' }}>
              <CircularProgress />
            </div>
          ) :
            (<>
              <Box
                sx={{
                  backgroundColor: mainColor, color: 'white', paddingY: 1, paddingX: 2,
                  display: 'flex', justifyContent: 'space-between'
                }}
              >
                <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                  <Alert onClose={handleClose} variant='filled' severity="success" sx={{ width: '100%' }}>
                    Cập nhật trạng thái thành công
                  </Alert>
                </Snackbar>
                <div>
                  <Typography>
                    <CalendarMonth />
                    {detail.DateOrder &&
                      new Intl.DateTimeFormat('vi-VN', {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: false,
                        month: 'numeric',
                        day: 'numeric',
                        weekday: 'long',
                        year: 'numeric',
                        timeZone: 'Asia/Ho_Chi_Minh',
                      }).format(Date.parse(detail.DateOrder))}
                  </Typography>
                  <Typography>
                    Mã đơn hàng: {detail.OrderID}
                  </Typography>
                </div>
                {updateStatus !== 'Delivered' ?
                  <Button variant='contained' sx={{ backgroundColor: 'white', color: mainColor }}
                    onClick={() => handleChangeStatus(nextStatus(updateStatus))}>
                    Chuyển trạng thái thành {orderStatus.find(x => x.eng === nextStatus(updateStatus)).viet}
                  </Button>
                  :
                  <Paper elevation={2} sx={{ display: 'flex', paddingX: '1em' }}>
                    <Typography variant="button" sx={{ alignSelf: 'center', color: mainColor }}>Đơn hàng đã hoàn thành</Typography>
                  </Paper>
                }

              </Box>
              <Grid container paddingX={2} >
                <Grid item xs={4}>
                  <AccountCircle sx={{ color: mainColor }} />
                  <Typography> {detail.NameUser}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LocalShipping sx={{ color: mainColor }} />
                  <Typography>{detail.Phone}</Typography>
                  <Typography>Thanh toán: {detail.PaymentMethod}</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LocationOn sx={{ color: mainColor }} />
                  <Typography> {detail.Address}</Typography>
                </Grid>
              </Grid>
              <Box sx={{ paddingX: 10 }}  >
                <TableContainer component={Paper}
                  sx={{ [`& .MuiTableCell-root`]: { fontSize: 'inherit' }, }}>
                  <Table sx={{ minWidth: 400 }} aria-label="simple table">
                    <TableHead sx={{ borderBottom: '2px solid black' }}>
                      <TableRow>
                        <TableCell align="center">STT</TableCell>
                        <TableCell align="center">Món ăn</TableCell>
                        <TableCell align="center">Đơn giá</TableCell>
                        <TableCell align="center">Số lượng</TableCell>
                        <TableCell align="center">Thành tiền</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detail.ListFood.map((food, stt = 0) => (
                        <>
                          <TableRow key={food.FoodID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell align="center">{++stt}</TableCell>
                            <TableCell align="center">{food.FoodName}</TableCell>
                            <TableCell align="center">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(food.OriPrice)}
                            </TableCell>
                            <TableCell align="center">{food.Quantity}</TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                .format(food.Price)}
                            </TableCell>
                          </TableRow>
                          {food.ListTopping.map((topping) => (
                            <TableRow key={topping.ToppingID} sx={{ fontSize: 'smaller' }}>
                              <TableCell></TableCell>
                              <TableCell align="center">{topping.ToppingName}</TableCell>
                              <TableCell></TableCell>
                              <TableCell align="center" >{topping.Quantity}</TableCell>
                              <TableCell align="right" >
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                  .format(topping.Price)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
                <Typography variant="subtitle2" mt={1}>Ghi chú: {detail.Note}</Typography>

                <Grid container sx={{ marginY: 2 }}>
                  <Grid item xs={6} />
                  <Grid item xs={3}>
                    <Typography>Tạm tính:</Typography>
                    <Typography>Giảm giá:</Typography>
                    <Typography>Phí ship:</Typography>
                    <Typography>Tổng cộng:</Typography>
                    <Typography sx={{ marginTop: 2 }}>Trạng thái:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ textAlign: 'right' }}>
                      {new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' })
                        .format(detail.TempTotalPrice)}
                    </Typography>
                    <Typography sx={{ textAlign: 'right' }}>
                      {new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' })
                        .format(detail.Discount)}
                    </Typography>
                    <Typography sx={{ textAlign: 'right' }}>
                      {new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' })
                        .format(detail.FeeShip)}
                    </Typography>
                    <Typography sx={{ textAlign: 'right', fontWeight: 'bold' }}>
                      {new Intl.NumberFormat('vi-VN',
                        { style: 'currency', currency: 'VND' })
                        .format(detail.TotalPrice)}
                    </Typography>
                    <Typography sx={{ textAlign: 'right', color: '#FF8357', fontWeight: 'bold', marginTop: 2 }}>
                      {orderStatus.find(x => x.eng === updateStatus).viet}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </>)
        }
      </Stack>
    </>
  )
}

export default OrderDetail
