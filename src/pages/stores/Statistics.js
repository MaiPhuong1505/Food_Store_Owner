import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ExampleChart from '../../../src/assets/images/exampleChart.png'
import { storeServices } from '../../services/stores.services'
// import Chart from '../../components/stores/Chart'

const Statistics = () => {

    const [monthRevenue, setMonthRevevue] = useState([])
    const [bestSeller, setBestSeller] = useState([])
    const [isLoading, setLoading] = useState(true)

    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")

    const getMonthRevenue = async (id, month, year, token) => {
        try {
            const monthRevenue = await storeServices.getMonthRevenue(id, month, year, token)
            if (monthRevenue.data) {
                setMonthRevevue(monthRevenue.data)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const month = moment().month() + 1
        const year = moment().year()
        getMonthRevenue(storeId, month, year, token)
    }, [])

    return (
        <Box sx={{ margin: 2 }}>
            <Grid container spacing={2} >
                <Grid item xs={6}>
                    <Box display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
                        <Typography variant='h6' sx={{ textAlign: 'center' }}>Doanh thu tháng này</Typography>
                        <Typography variant='h5' sx={{ marginY: 2, textAlign: 'center', fontWeight: 'bold' }}>
                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(monthRevenue.revenue) || ''}
                        </Typography>
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
                        <Typography variant='h6' sx={{ textAlign: 'center' }}>Tổng số đơn hàng</Typography>
                        <Typography variant='h5' sx={{ marginY: 2, textAlign: 'center', fontWeight: 'bold' }}>512</Typography>
                    </Box>
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
                    <Box display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
                        <Typography sx={{ marginY: 1, textAlign: 'center', fontWeight: 'bold' }}>Best-seller</Typography>
                        <img src='https://product.hstatic.net/1000383678/product/e72404a9-81c9-4dd9-84a8-9f2669a4fe0d_4d8d47298f404305afa576db3ba5c7f2.jpeg'
                            style={{ margin: 'auto', maxWidth: '80%' }} alt='best-seller' />
                        <Typography sx={{ marginY: 1, textAlign: 'center', fontWeight: 'bold' }}>Trà sữa matcha kem cheese</Typography>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Statistics
