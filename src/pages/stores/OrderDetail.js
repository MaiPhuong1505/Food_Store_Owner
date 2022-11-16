import React from 'react'
import { Stack, Box } from '@mui/system'
import {
    Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    InputLabel, ListItemText, MenuItem, Select, FormControl, IconButton, Typography, Button, Grid, CircularProgress
} from '@mui/material';
import { AccountCircle, CalendarMonth, LocalShipping, LocationOn } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { storeServices } from '../../services/stores.services';


const OrderDetail = () => {
    let { id } = useParams()
    const token = localStorage.getItem("AccessToken")

    const [detail, setDetail] = useState({})
    const [isLoading, setLoading] = useState(true)

    const getOrderDetail = async (orderId, token) => {
        try {
            const orderDetail = await storeServices.getOrderDetail(orderId, token)
            if (orderDetail.data) {

                setDetail(orderDetail.data)

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
    console.log("detail:", detail)
    const mainColor = '#89D5C9'

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
                                <Button variant='contained' sx={{ backgroundColor: 'white', color: mainColor }}>
                                    Chuyển trạng thái thành đang giao hàng
                                </Button>
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
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                    >
                                                        <TableCell align="center">{++stt}</TableCell>
                                                        <TableCell align="center">{food.FoodName}</TableCell>
                                                        <TableCell align="center">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                                .format(food.Price)}
                                                        </TableCell>
                                                        <TableCell align="center">{food.Quantity}</TableCell>
                                                        <TableCell align="center">
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                                .format(food.Price * food.Quantity)}
                                                        </TableCell>
                                                    </TableRow>
                                                    {food.ListTopping.map((topping) => (
                                                        <TableRow>
                                                            <TableCell align="center" colSpan={3} >{topping.ToppingName}</TableCell>
                                                            <TableCell align="center" >{topping.Quantity}</TableCell>
                                                            <TableCell align="center" >
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
                                        <Typography sx={{ textAlign: 'right', color: '#FF8357', fontWeight: 'bold', marginTop: 2 }}>Đã xác nhận</Typography>
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
