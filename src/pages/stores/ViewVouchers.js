import React from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { storeServices } from '../../services/stores.services';
import { useState, useEffect } from 'react';
import { mainColor } from '../../consts';

const ViewVouchers = () => {
  const storeId = localStorage.getItem("StoreId")
  const token = localStorage.getItem("AccessToken")
  const startDate = new Date(1990, 0, 1).toISOString()
  const endDate = new Date(2099, 11, 31).toISOString()

  const [voucherList, setVoucherList] = useState([])
  const [isLoading, setLoading] = useState(true)

  var pageNumber = 1
  var pageSize = 10
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  const [total, setTotal] = useState(0)

  let navigate = useNavigate()

  const handleChangePage = (event, newPage) => {
    pageNumber = newPage + 1
    pageSize = rowsPerPage
    setPage(newPage)
    getStoreVouchers(storeId, startDate, endDate, pageNumber, pageSize, 'All', 'All', 'StartDate', 'Desc', token)
  }

  const getStoreVouchers = async (id, start, end, pageNum, size, query, queryType, sortBy, sortType, token) => {
    try {
      const voucherList = await storeServices.getStoreVouchers(id, start, end, pageNum, size, query, queryType, sortBy, sortType, token)
      if (voucherList.data) {
        setVoucherList(voucherList.data.cards)
        setTotal(voucherList.data.total)
        setPage(voucherList.data.pageIndex - 1)
        setRowsPerPage(voucherList.data.pageSize)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getStoreVouchers(storeId, startDate, endDate, pageNumber, pageSize, 'All', 'All', 'StartDate', 'Desc', token)
  }, [])

  const createClick = () => {
    navigate("/store/vouchers/createVoucher")
  }

  const editClick = (id) => {
    navigate(`/store/vouchers/updateVoucher/${id}`)
  }

  const handleDelete = (id) => {
    const deleteVoucher = async (id) => {
      try {
        const response = await storeServices.deleteVoucher(id, token)
        if (response) {
          let newList = voucherList
          setVoucherList(newList.filter((item) => {
            return item.voucherId !== id
          }))
          setTotal(total - 1)
        }
      } catch (error) {
        console.log(error)
      }
    }
    if (window.confirm('Bạn chắc chắn muốn xoá voucher này?')) {
      deleteVoucher(id)
    } else return
  }
  return (
    <>
      <Stack spacing={2} sx={{
        padding: 3
      }}>
        <Box
          display="flex"
          justifyContent={"flex-end"}>
          <Button variant='contained' onClick={createClick} sx={{ background: mainColor }}>
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
                      <TableCell align="center">Mức giảm (%)</TableCell>
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
                        <TableCell align="center">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher.minSpend)}
                        </TableCell>
                        <TableCell align="center">{voucher.amount}</TableCell>
                        {/* <TableCell align="center">{voucher.type}</TableCell> */}
                        <TableCell align="center">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(voucher.maxDiscount)}
                        </TableCell>
                        <TableCell align="center">{voucher.code}</TableCell>
                        <TableCell align="center">
                          {
                            new Intl.DateTimeFormat('vi-VN', {
                              hour: 'numeric',
                              minute: 'numeric',
                              hour12: false,
                              month: 'numeric',
                              day: 'numeric',
                              weekday: 'long',
                              year: 'numeric',
                              timeZone: 'Asia/Ho_Chi_Minh',
                            }).format(Date.parse(voucher.startDate))
                          }
                        </TableCell>
                        <TableCell align="center">
                          {new Intl.DateTimeFormat('vi-VN', {
                            hour: 'numeric',
                            minute: 'numeric',
                            hour12: false,
                            month: 'numeric',
                            day: 'numeric',
                            weekday: 'long',
                            year: 'numeric',
                            timeZone: 'Asia/Ho_Chi_Minh',
                          }).format(Date.parse(voucher.endDate))}
                        </TableCell>

                        <TableCell align="center">
                          <IconButton
                            onClick={() => editClick(voucher.voucherId)}
                          >
                            <Edit sx={{ color: mainColor }} />
                          </IconButton>
                          <IconButton onClick={() => handleDelete(voucher.voucherId)}>
                            <Delete sx={{ color: '#E25B45' }} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TablePagination
                        style={{ border: 'none' }}
                        rowsPerPageOptions={[10]}
                        count={total}
                        colSpan={10}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          inputProps: {
                            'aria-label': 'rows per page',
                          },
                          native: true,
                        }}
                        onPageChange={handleChangePage}
                      // onRowsPerPageChange={handleChangeRowsPerPage}
                      // ActionsComponent={TablePaginationActions}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            )
        }

      </Stack>
    </>
  )
}

export default ViewVouchers
