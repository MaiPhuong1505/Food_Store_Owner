import React, { useEffect, useState } from 'react'
import { Box, Button, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment/moment'
import { storeServices } from '../../services/stores.services'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateVoucher = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const token = localStorage.getItem("AccessToken")
  const storeId = localStorage.getItem("StoreId")

  const [startDay, setStartDay] = useState(moment())
  const [expireDay, setExpireDay] = useState(moment())
  const [isLoading, setLoading] = useState(true)
  const [voucherInfo, setVoucherInfo] = useState({})

  const getVoucherById = async () => {
    try {
      const voucher = await storeServices.getVoucherById(id, token)
      if (voucher.data) {
        setVoucherInfo(voucher.data)
        setStartDay(voucher.data.startDay)
        setExpireDay(voucher.data.expireDay)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setVoucherInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async () => {
    let info = {
      voucherID: id,
      name: voucherInfo.name,
      description: voucherInfo.description,
      minSpend: voucherInfo.minSpend,
      amount: voucherInfo.amount,
      maxDiscount: voucherInfo.maxDiscount,
      StoreId: storeId,
      code: voucherInfo.code,
      expireDay: expireDay,
      startDay: startDay
    }
    try {
      const response = await storeServices.updateVoucher(info, token)
      if (response) {
        navigate("/store/vouchers")
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getVoucherById()
  }, [])

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <Box
        display="flex"
        justifyContent={"center"}
        flexDirection={'column'}
        paddingY={3}
        paddingX={3}
        marginY={3}
        marginX={12}
        sx={{ backgroundColor: 'white' }}>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Typography>
              Tên voucher <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
            <TextField
              size='small' fullWidth margin="dense" type={'text'}
              placeholder='Tên voucher'
              value={voucherInfo.name || ''}
              name='name'
              variant="standard"
              onChange={handleChange}
            >
            </TextField>
          </Grid>
          <Grid item xs={5}>
            <Typography>
              Mã <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
            <TextField
              size='small' fullWidth margin="dense" type={'text'}
              placeholder='Nhập mã voucher'
              variant="standard"
              value={voucherInfo.code || ''}
              name='code'
              onChange={handleChange}
            >
            </TextField>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 1 }}>
          Mô tả <span style={{ color: "#E25B45" }}>*</span>
        </Typography>
        <TextField
          multiline rows={3}
          size='small' fullWidth margin="dense" type={'text'}
          placeholder='Nhập mô tả voucher'
          value={voucherInfo.description || ''}
          name='description'
          onChange={handleChange}
        >
        </TextField>
        <Divider sx={{ border: '2px solid lightgrey', marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={5}
            sx={{
              display: 'flex',
              flexFlow: 'wrap',
              alignContent: 'center',
            }}>
            <Typography>
              Điều kiện áp dụng <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              size='small' fullWidth margin="dense" type={'number'}
              variant="standard"
              placeholder='Nhập giá trị đơn hàng tối thiểu'
              value={voucherInfo.minSpend || ''}
              name='minSpend'
              onChange={handleChange}
            >
            </TextField>
          </Grid>
          <Grid item xs={5}
            sx={{
              display: 'flex',
              flexFlow: 'wrap',
              alignContent: 'center',
            }}>
            <Typography>
              Mức giảm giá (%) <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              size='small' fullWidth margin="dense" type={'number'}
              variant="standard"
              placeholder='Nhập giá trị'
              value={voucherInfo.amount || ''}
              name='amount'
              onChange={handleChange}
            >
            </TextField>
          </Grid>
          <Grid item xs={5}
            sx={{
              display: 'flex',
              flexFlow: 'wrap',
              alignContent: 'center',
            }}>
            <Typography>
              Mức giảm tối đa (VND) <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={7}>
            <TextField
              size='small' fullWidth margin="dense" type={'number'}
              variant="standard"
              placeholder='Nhập giá trị'
              value={voucherInfo.maxDiscount || ''}
              name='maxDiscount'
              onChange={handleChange}
            >
            </TextField>
          </Grid>
        </Grid>
        <Divider sx={{ border: '2px solid lightgrey', marginY: 2 }} />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>
              Ngày áp dụng <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} >
              <DateTimePicker
                renderInput={(props) =>
                  <TextField {...props} />
                }
                label="Ngày áp dụng"
                value={startDay}
                inputFormat="DD/MM/YYYY hh:mm a"
                onChange={(newValue) => {
                  setStartDay(newValue)
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <Typography>
              Ngày hết hạn <span style={{ color: "#E25B45" }}>*</span>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Ngày hết hạn"
                inputFormat="DD/MM/YYYY hh:mm a"
                value={expireDay}
                onChange={(newValue) => {
                  setExpireDay(newValue)
                }}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginBottom: 3
        }}>
        <Button variant='contained' onClick={handleSubmit}>Lưu</Button>
        <Button variant='outlined'>Thoát</Button>
      </Box>
    </>
  )
}

export default UpdateVoucher
