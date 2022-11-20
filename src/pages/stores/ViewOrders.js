import { Stack, Box } from '@mui/system'
import {
    Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    InputLabel, ListItemText, MenuItem, Select, FormControl, IconButton, CircularProgress
} from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Visibility } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { storeServices } from '../../services/stores.services';

const ViewOrders = () => {
    const [orders, setOrders] = useState([])
    const [isLoading, setLoading] = useState(true)

    let navigate = useNavigate()
    const token = localStorage.getItem("AccessToken")
    const storeId = localStorage.getItem("StoreId")

    const getOrders = async (id, token) => {
        try {
            const orders = await storeServices.getOrders(id, token)
            if (orders.data) {
                setOrders(orders.data)
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getOrders(storeId, token)
    }, [])

    const stateList = [
        "Đơn hàng mới",
        "Đang xử lý",
        "Đang giao hàng",
        "Đã giao hàng",
    ]
    const [stateOrder, setStateOrder] = useState([])
    const handleChange = (event) => {
        setStateOrder(event.target.value)
    }
    const editClick = (id) => {
        navigate(`/store/order/detail/${id}`)
    }
    const mainColor = '#89D5C9'
    return (
        <>
            <Stack
                spacing={2} sx={{
                    margin: 3,
                    padding: 3,
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 3px grey'
                }}
            >
                <Box
                    display="flex"
                    justifyContent={"space-between"}>
                    <TextField placeholder='Tìm kiếm' size='small' sx={{ minWidth: '20vw' }} />
                    <FormControl size="small" sx={{ minWidth: '20vw' }}>
                        <InputLabel id="demo-select-small">Trạng thái</InputLabel>
                        <Select
                            autoWidth
                            labelId="demo-select-small"
                            id="demo-select-small"
                            value={stateOrder}
                            onChange={handleChange}
                            label={'Danh mục'}
                        >
                            {stateList.map((value) => (
                                <MenuItem key={value} value={value}>
                                    <ListItemText primary={value} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Divider />
                {isLoading ? <CircularProgress /> :
                    <TableContainer component={Paper}>
                        <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead sx={{ borderBottom: '2px solid black' }}>
                                <TableRow>
                                    <TableCell align="center">STT</TableCell>
                                    <TableCell align="center">Tên</TableCell>
                                    <TableCell align="center">Địa chỉ</TableCell>
                                    <TableCell align="center">SĐT</TableCell>
                                    <TableCell align="center">Thành tiền</TableCell>
                                    <TableCell align="center">Ngày đặt hàng</TableCell>
                                    <TableCell align="center">Trạng thái</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order, stt) => (
                                    <TableRow
                                        key={order.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell align="center">{++stt}</TableCell>
                                        <TableCell align="center">{order.nameUser}</TableCell>
                                        <TableCell align="center">{order.address}</TableCell>
                                        <TableCell align="center">{order.sdt}</TableCell>
                                        <TableCell align="center">
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                                                .format(order.totalPrice)}
                                        </TableCell>
                                        <TableCell align="center">
                                            {new Intl.DateTimeFormat('vi-VN', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: false,
                                                month: 'numeric',
                                                day: 'numeric',
                                                weekday: 'long',
                                                year: 'numeric',
                                                timeZone: 'Asia/Ho_Chi_Minh',
                                            }).format(Date.parse(order.dateOrder))}
                                        </TableCell>
                                        <TableCell align="center">{order.state}</TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                onClick={() => editClick(order.id)}
                                            >

                                                <Visibility sx={{ color: mainColor }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }

            </Stack>
        </>
    )
}

export default ViewOrders
