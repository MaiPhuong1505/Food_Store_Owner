import React from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { storeServices } from '../../services/stores.services';
import { useState, useEffect } from 'react';

const ViewVouchers = () => {
    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")
    const mainColor = '#89D5C9'

    const [voucherList, setVoucherList] = useState([])
    const [isLoading, setLoading] = useState(true)

    let navigate = useNavigate()

    const getVouchers = async () => {
        try {
            const voucherList = await storeServices.getVouchers(storeId, token)
            if (voucherList.data) {
                setVoucherList(voucherList.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVouchers()
    }, [])

    const createClick = () => {
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

                {
                    isLoading ? <CircularProgress /> :
                        (
                            <TableContainer component={Paper}>
                                <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead sx={{ borderBottom: '2px solid black' }}>
                                        <TableRow>
                                            <TableCell align="center">STT</TableCell>
                                            <TableCell align="center">Voucher</TableCell>
                                            <TableCell align="center">Mô tả</TableCell>
                                            <TableCell align="center">Điều kiện tối thiểu</TableCell>
                                            <TableCell align="center">Mức giảm</TableCell>
                                            {/* <TableCell align="center">Đơn vị</TableCell> */}
                                            <TableCell align="center">Mức giảm tối đa</TableCell>
                                            <TableCell align="center">Mã</TableCell>
                                            <TableCell align="center">Ngày áp dụng</TableCell>
                                            <TableCell align="center">Ngày hết hạn</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {voucherList.map((voucher, stt = 0) => (
                                            <TableRow
                                                key={voucher.voucherId}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{++stt}</TableCell>
                                                <TableCell align="center">{voucher.name}</TableCell>
                                                <TableCell align="left">{voucher.description}</TableCell>
                                                <TableCell align="center">{voucher.minSpend}đ</TableCell>
                                                <TableCell align="center">{voucher.amount}</TableCell>
                                                {/* <TableCell align="center">{voucher.type}</TableCell> */}
                                                <TableCell align="center">{voucher.maxDiscount}</TableCell>
                                                <TableCell align="center">{voucher.code}</TableCell>
                                                <TableCell align="center">{voucher.startDate}</TableCell>
                                                <TableCell align="center">{voucher.endDate}</TableCell>

                                                <TableCell align="center">
                                                    <IconButton
                                                    // onClick={editClick(voucher.stt)}
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
                        )
                }

            </Stack>
        </>
    )
}

export default ViewVouchers
