import { Table, TableContainer, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material'
import React from 'react'

const PaymentStatistic = ({ payment }) => {
  const rows = [
    { month: 1, revenue: 51000000 },
    { month: 2, revenue: 51012000 },
    { month: 3, revenue: 50703000 },
    { month: 4, revenue: 50900000 },
    { month: 5, revenue: 51350000 },
    { month: 6, revenue: 52010000 },
    { month: 7, revenue: 50780000 },
    { month: 8, revenue: 49045000 },
    { month: 9, revenue: 51340000 },
    { month: 10, revenue: 50870000 },
    { month: 11, revenue: 51010000 },
    { month: 12, revenue: 53260000 },
  ]
  return (
    <>
      Doanh thu qua thanh toán bằng {payment}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 350 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align='center'>Tháng</TableCell>
              <TableCell align="right">Doanh thu</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.month}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align='center'>
                  {row.month}
                </TableCell>
                <TableCell align="right">
                  {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(row.revenue)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PaymentStatistic
