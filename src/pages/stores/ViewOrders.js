import { Stack, Box } from '@mui/system'
import {
  Divider, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField,
  InputLabel, ListItemText, MenuItem, Select, FormControl, IconButton, CircularProgress, TablePagination, TableFooter
} from '@mui/material';

import React, { useEffect, useState } from 'react'
import { Visibility } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { storeServices } from '../../services/stores.services';
import moment from 'moment'


const ViewOrders = () => {
  const [orders, setOrders] = useState([])
  const [isLoading, setLoading] = useState(true)
  const [stateOrder, setStateOrder] = useState('')

  let navigate = useNavigate()
  var state = ''
  var pageNumber = 1
  var pageSize = 10

  const token = localStorage.getItem("AccessToken")
  const storeId = localStorage.getItem("StoreId")
  const startDate = moment().startOf('year').utc(true).format()
  const endDate = moment().endOf('year').utc(true).format()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(pageSize)
  const [total, setTotal] = useState(0)

  const handleChangePage = (event, newPage) => {
    pageNumber = newPage + 1
    pageSize = rowsPerPage
    setPage(newPage)
    getOrders(storeId, startDate, endDate, pageNumber, pageSize, '0', 'createDate', 'Desc', stateOrder, token)
  }

  // const handleChangeRowsPerPage = (event) => {
  //   pageSize = parseInt(event.target.value, 10)
  //   setRowsPerPage(pageSize)
  //   // setPage(0);
  // }

  const getOrders = async (id, start, end, pageNum, size, query, sortBy, sortType, status, token) => {
    try {
      setLoading(true)
      if (!status) {
        status = 'all'
      }
      const response = await storeServices.getPagingOrders(id, start, end, pageNum, size, query, sortBy, sortType, status, token)
      if (response.data) {
        setOrders(response.data.viewOrderDtos)
        setTotal(response.data.total)
        setPage(response.data.pageIndex - 1)
        setRowsPerPage(response.data.pageSize)
      }
      // }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getOrders(storeId, startDate, endDate, pageNumber, pageSize, '0', 'createDate', 'Desc', state, token)
  }, [state])

  const orderStatus = [
    { eng: 'Ordered', viet: '????n h??ng m???i' },
    { eng: 'Processing', viet: '???? x??c nh???n' },
    { eng: 'Delivering', viet: '??ang giao h??ng' },
    { eng: 'Delivered', viet: '???? giao h??ng' },
    { eng: 'Canceled', viet: '???? hu???' },
  ]

  const handleChange = (event) => {
    setLoading(true)
    state = event.target.value
    setStateOrder(state)
    getOrders(storeId, startDate, endDate, pageNumber, pageSize, '0', 'createDate', 'Desc', state, token)
    // getOrders(storeId, state, token)
  }

  const detailClick = (id) => {
    navigate(`/store/order/detail/${id}`)
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
          <TextField placeholder='T??m ki???m' size='small' sx={{ minWidth: '20vw' }} />
          <FormControl size="small" sx={{ minWidth: '20vw' }}>
            <InputLabel id="demo-select-small">Tr???ng th??i</InputLabel>
            <Select
              autoWidth
              labelId="demo-select-small"
              id="demo-select-small"
              value={stateOrder}
              onChange={handleChange}
              label={'Danh m???c'}
            >
              <MenuItem key='all' value='all'>
                <ListItemText primary='T???t c???' />
              </MenuItem>
              {orderStatus.map((value) => (
                <MenuItem key={value.eng} value={value.eng}>
                  <ListItemText primary={value.viet} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Divider />

        <TableContainer component={Paper}>

          <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead sx={{ borderBottom: '2px solid black' }}>
              <TableRow>
                <TableCell align="center">STT</TableCell>
                <TableCell align="center">T??n</TableCell>
                <TableCell align="center">?????a ch???</TableCell>
                <TableCell align="center">S??T</TableCell>
                <TableCell align="center">Th??nh ti???n</TableCell>
                <TableCell align="center">Ng??y ?????t h??ng</TableCell>
                <TableCell align="center">Tr???ng th??i</TableCell>
              </TableRow>
            </TableHead>
            {isLoading ?
              <TableBody>
                <TableRow>
                  <TableCell colSpan={7} align="center" sx={{ borderBottom: 'none' }}>
                    <CircularProgress />
                  </TableCell>
                </TableRow>
              </TableBody>
              :
              <TableBody>
                {orders.map((order, stt) => (
                  <TableRow
                    key={order.id}
                  // sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="center">{++stt}</TableCell>
                    <TableCell align="center">{order.nameUser}</TableCell>
                    <TableCell align="center">{order.address}</TableCell>
                    <TableCell align="center">{order.sdt}</TableCell>
                    <TableCell align="center">
                      {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })
                        .format(order.totalPrice)}
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
                      }).format(Date.parse(order.dateOrder))}
                    </TableCell>
                    <TableCell align="center">{orderStatus.find(x => x.eng === order.state).viet}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        onClick={() => detailClick(order.id)}
                      >
                        <Visibility sx={{ color: mainColor }} />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            }
            <TableFooter>
              <TableRow>
                <TablePagination
                  style={{ border: 'none' }}
                  rowsPerPageOptions={[10]}
                  count={total}
                  colSpan={7}
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


      </Stack>
    </>
  )
}

export default ViewOrders
