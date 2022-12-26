import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react'
import { storeServices } from '../../services/stores.services'
import { useEffect, useState } from 'react'
import { CircularProgress, Typography } from '@mui/material'
const PaymentStatistic = ({ payment, storeId }) => {

  const [isLoading, setLoading] = useState(true)
  const [data, setData] = useState()
  const [textShow, setTextShow] = useState(" ")
  const columnWidth = '7%'

  const getRevenue = async (payment, storeId) => {
    try {
      const revenue = await storeServices.getStoreStatic(storeId, 2022, payment)
      if (revenue.data) {
        setData(revenue.data)
      }
    } catch (error) {
      console.error(error);
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getRevenue(payment, storeId)
    if (payment === 'All') {
      setTextShow("Tất cả")
    } else if (payment === 'Tien mat') {
      setTextShow("Tiền mặt")
    } else {
      setTextShow(payment)
    }
  }, []);

  return (
    <>
      <Typography align='center' margin={1}>Doanh thu qua thanh toán bằng {textShow} </Typography>
      {isLoading ? <CircularProgress sx={{ alignSelf: 'center' }} /> :
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 350, overflow: 'auto' }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align='center'>Tháng</TableCell>
                {
                  data.map((row) => (
                    <TableCell align="right" sx={{ minWidth: columnWidth, maxWidth: columnWidth }}>{row.month}</TableCell>
                  ))
                }

              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align="center">Doanh thu</TableCell>
                {data.map((row) => (
                  <TableCell align="right" sx={{ minWidth: columnWidth, maxWidth: columnWidth }}>
                    {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.revenue)}
                  </TableCell>
                ))}
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      }
    </>
  )
}

export default PaymentStatistic
