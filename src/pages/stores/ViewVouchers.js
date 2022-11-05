import React from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';

const ViewVouchers = () => {
    const mainColor = '#89D5C9'
    let navigate = useNavigate()

    //hardcode du lieu
    function createData(stt, voucher, description, minSpend, amount, type, maxDiscount, code, startDay, expireDay) {
        return { stt, voucher, description, minSpend, amount, type, maxDiscount, code, startDay, expireDay };
    }

    const rows = [
        createData(1, 'Voucher tháng 10', 
        `- Giảm 10% cho đơn hàng từ 50000đ, tối đa 25000đ
        - Chỉ áp dụng 1 voucher trong 1 đơn hàng
        - Voucher được sử dụng nhiều lần`,
        50000, 10, '%', 25000, 'VT10PT10D50', '1/10/2022', '31/10/2022'),
        createData(2, 'Voucher freeship', 
        `- Miễn phí giao hàng cho đơn hàng từ 70000đ, tối đa 15000đ
        - Chỉ áp dụng 1 voucher trong 1 đơn hàng
        - Voucher được sử dụng nhiều lần`,
        70000, 100, '%', 15000, 'VFREESHIP', '1/5/2022', '31/12/2022'),
    ]
    const createClick = () =>{
        navigate("/store/vouchers/createVoucher")
    }
    return (
    <>
        <Stack spacing={2} sx={{
            padding: 3
        }}>
            <Box
                display="flex"
                justifyContent={"flex-end"}>
                <Button variant='contained' onClick={createClick}>
                Thêm voucher
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead sx={{ borderBottom: '2px solid black' }}>
                        <TableRow>
                            <TableCell align="center">STT</TableCell>
                            <TableCell align="center">Voucher</TableCell>
                            <TableCell align="center">Mô tả</TableCell>
                            <TableCell align="center">Điều kiện tối thiểu</TableCell>
                            <TableCell align="center">Mức giảm</TableCell>
                            <TableCell align="center">Đơn vị</TableCell>
                            <TableCell align="center">Mức giảm tối đa</TableCell>
                            <TableCell align="center">Mã</TableCell>
                            <TableCell align="center">Ngày áp dụng</TableCell>
                            <TableCell align="center">Ngày hết hạn</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center">{row.stt}</TableCell>
                                <TableCell align="center">{row.voucher}</TableCell>
                                <TableCell align="left">{row.description}</TableCell>
                                <TableCell align="center">{row.minSpend}đ</TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="center">{row.type}</TableCell>
                                <TableCell align="center">{row.maxDiscount}</TableCell>
                                <TableCell align="center">{row.code}</TableCell>
                                <TableCell align="center">{row.startDay}</TableCell>
                                <TableCell align="center">{row.expireDay}</TableCell>
                                
                                <TableCell align="center">
                                    <IconButton
                                    // onClick={editClick(row.stt)}
                                    >
                                        <Edit sx={{ color: mainColor }} />
                                    </IconButton>
                                    <IconButton>
                                        <Delete sx={{ color: '#E25B45' }} />
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

export default ViewVouchers
