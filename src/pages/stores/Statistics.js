import { CircularProgress, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Chart from '../../components/stores/Chart'
import MonthBestSeller from '../../components/stores/MonthBestSeller'
import MonthOrders from '../../components/stores/MonthOrders'
import MonthRevenue from '../../components/stores/MonthRevenue'
import PaymentStatistic from '../../components/stores/PaymentStatistic'

const Statistics = () => {

    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")

    const [payment, setPayment] = useState('Cash')

    const handleChange = (e) => {
        setPayment(e.target.value)
    }

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <MonthRevenue storeId={storeId} token={token} />
                </Grid>
                <Grid item xs={6}>
                    <MonthOrders storeId={storeId} token={token} />
                </Grid>
                <Grid item xs={7}>
                    <Chart storeId={storeId} token={token} />
                </Grid>
                <Grid item xs={5}>
                    <MonthBestSeller storeId={storeId} token={token} />
                </Grid>
                <Grid item xs={7} component={Paper} sx={{ margin: 2 }}>
                    <Typography variant='h6' sx={{ textAlign: 'center' }}>Chi tiết doanh thu</Typography>
                    <Stack sx={{ paddingLeft: 1, paddingRight: 3, paddingY: 3 }}>
                        <FormControl sx={{ alignSelf: 'flex-end' }} size='small'>
                            <InputLabel id="payment-select-label">Phương thức thanh toán</InputLabel>
                            <Select
                                labelId="payment-select-label"
                                id="payment-select"
                                value={payment}
                                label="Phương thức thanh toán"
                                onChange={handleChange}
                                sx={{ minWidth: 200 }}
                            >
                                <MenuItem value={'Cash'}>Tiền mặt</MenuItem>
                                <MenuItem value={'Paypal'}>PayPal</MenuItem>
                            </Select>
                        </FormControl>
                        <Divider sx={{ marginY: 3 }} />
                        <PaymentStatistic payment={payment} />
                    </Stack>
                </Grid>
                <Grid item xs={5}>

                </Grid>
            </Grid>
        </Box>
    )
}

export default Statistics
