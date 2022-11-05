import { Stack, Box } from '@mui/system'
import {
    Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
    InputLabel, ListItemText, MenuItem, Select, FormControl, IconButton
} from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ViewOrders = () => {
    let navigate = useNavigate()
    function createData(stt, name, address, phone, total, date, state) {
        return { stt, name, address, phone, total, date, state };
    }

    const rows = [
        createData(1, 'Nguyễn Văn C', '12 đường số 1, Liên Chiểu, TP. Đà Nẵng', 
        '0987654321', 45000, '17:00 ngày 4/10/2022', 'Đang xử lý'),
        createData(2, 'Lê Thị D', '31 đường A, Thanh Khê, TP. Đà Nẵng', 
        '0123654789', 63000, '16:00 ngày 4/10/2022', 'Đã giao hàng'),
    ]

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
    const editClick = () => {
        navigate('/store/order/detail')
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
                    <TextField placeholder='Tìm kiếm' size='small' sx={{minWidth: '20vw'}}/>
                    <FormControl size="small" sx={{minWidth: '20vw'}}>
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
                <Divider/>
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
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.stt}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.address}</TableCell>
                                    <TableCell align="center">{row.phone}</TableCell>
                                    <TableCell align="center">{row.total} đ</TableCell>
                                    <TableCell align="center">{row.date}</TableCell>
                                    <TableCell align="center">{row.state}</TableCell>
                                    {/* address, phone, total, date, state */}
                                    <TableCell align="center">
                                        <IconButton
                                        onClick={editClick}
                                        >
                                            <Visibility sx={{color: mainColor}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    )
}

export default ViewOrders
