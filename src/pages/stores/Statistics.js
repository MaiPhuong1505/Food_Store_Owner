import { CircularProgress, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ExampleChart from '../../../src/assets/images/exampleChart.png'
import MonthBestSeller from '../../components/stores/MonthBestSeller'
import MonthOrders from '../../components/stores/MonthOrders'
import MonthRevenue from '../../components/stores/MonthRevenue'
import { storeServices } from '../../services/stores.services'
// import Chart from '../../components/stores/Chart'

const Statistics = () => {

    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")

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
                    <Box display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
                        <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>Thống kê doanh thu cả năm</Typography>
                        <img src={ExampleChart} style={{ margin: 10 }} alt='chart' />
                    </Box>
                </Grid>
                <Grid item xs={5}>
                    <MonthBestSeller storeId={storeId} token={token} />
                </Grid>
            </Grid>
        </Box>
    )
}

export default Statistics
