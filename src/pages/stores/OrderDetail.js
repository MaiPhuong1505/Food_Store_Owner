import React from 'react'
import { Stack, Box } from '@mui/system'
import {
    Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    InputLabel, ListItemText, MenuItem, Select, FormControl, IconButton, Typography, Button, Grid
} from '@mui/material';
import { AccountCircle, CalendarMonth, LocalShipping, LocationOn } from '@mui/icons-material';

const OrderDetail = () => {
    const mainColor = '#89D5C9'
    function createData(stt, food, price, quantity, subtotal) {
        return { stt, food, price, quantity, subtotal };
    }

    const rows = [
        createData(1, 'Trà sữa truyền thống', 25000, 1, 25000),
    ]
    return (
        <>
            <Stack
                spacing={2} sx={{
                    margin: 3,
                    backgroundColor: 'white',
                    boxShadow: '0px 0px 3px grey'
                }}>
                <Box
                    sx={{
                        backgroundColor: mainColor, color: 'white', paddingY: 1, paddingX: 2,
                        display: 'flex', justifyContent: 'space-between'
                    }}
                >
                    <div>
                        <Typography>
                            <CalendarMonth />
                            17:00 4/10/2022
                        </Typography>
                        <Typography>
                            Mã đơn hàng: 1234
                        </Typography>
                    </div>
                    <Button variant='contained' sx={{ backgroundColor: 'white', color: mainColor }}>
                        Chuyển trạng thái thành đang giao hàng
                    </Button>
                </Box>
                <Grid container paddingX={2} >
                    <Grid item xs={4}>
                        <AccountCircle sx={{color: mainColor}}/>
                        <Typography> Nguyễn Văn C</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <LocalShipping sx={{color: mainColor}}/>
                        <Typography> 0987654321</Typography>
                        <Typography> Thanh toán: tiền mặt</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <LocationOn sx={{color: mainColor}}/>
                        <Typography> 12 đường số 1, Liên Chiểu, TP. Đà Nẵng</Typography>
                    </Grid>
                </Grid>
                <Box sx={{ paddingX: 10 }}  >
                    <TableContainer component={Paper} 
                    sx={{[`& .MuiTableCell-root`]: { fontSize:'inherit' },}}>
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
                                <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="center">Trà sữa truyền thống</TableCell>
                                    <TableCell align="center">25000đ</TableCell>
                                    <TableCell align="center">1</TableCell>
                                    <TableCell align="center">25000đ</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="center" colSpan={4} sx={{[`& .MuiTableCell-root`]: { fontSize:'small' },}}>Trân châu đen</TableCell>
                                    <TableCell align="center" sx={{[`& .MuiTableCell-root`]: { fontSize:'small' },}}>5000đ</TableCell>
                                </TableRow>
                                {/* bảng riêng */}

                            </TableBody>
                        </Table>
                    </TableContainer>
                    
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
                            <Typography sx={{textAlign: 'right'}}>30000đ</Typography>
                            <Typography sx={{textAlign: 'right'}}>0</Typography>
                            <Typography sx={{textAlign: 'right'}}>5000đ</Typography>
                            <Typography sx={{textAlign: 'right', fontWeight: 'bold'}}>35000đ</Typography>
                            <Typography sx={{textAlign: 'right', color: '#FF8357', fontWeight: 'bold',marginTop: 2 }}>Đã xác nhận</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Stack>
        </>
    )
}

export default OrderDetail
