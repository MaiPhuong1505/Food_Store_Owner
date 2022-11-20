import { CircularProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts'
import { storeServices } from '../../services/stores.services'


const Chart = ({ storeId, token }) => {
  const [revenueList, setRevenueList] = useState([])
  const [monthList, setMonthList] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getRevenueOfYear = async (storeId, year, token) => {
    try {
      const response = await storeServices.getRevenueOfYear(storeId, year, token)
      if (response.data) {
        setRevenueList(response.data?.map((item) => item.revenue))
        setMonthList(response.data?.map((item) => item.month))
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const year = moment().year()
    getRevenueOfYear(storeId, year, token)
  }, [])

  const c = {
    series: [{
      name: 'Doanh thu',
      data: revenueList
    },],
    options: {
      chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: monthList,
      },
      yaxis: {
        title: {
          text: '(VND)'
        },
        labels: {
          formatter: function (value) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
              .format(value);
          }
        },
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
              .format(val)
          }
        }
      }
    },
  }

  return (
    <Box display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      sx={{ backgroundColor: 'white', boxShadow: '0px 0px 3px grey' }}>
      <Typography sx={{ marginTop: 1, textAlign: 'center', fontWeight: 'bold' }}>Thống kê doanh thu cả năm</Typography>

      {
        isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
          <ReactApexChart options={c.options} series={c.series} type="bar" />
      }
    </Box>
  )
}

export default Chart
