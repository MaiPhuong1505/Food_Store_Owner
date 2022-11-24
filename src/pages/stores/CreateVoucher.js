import React, { useState } from 'react'
import { Box, Button, Divider, Grid, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import moment from 'moment/moment'
import { storeServices } from '../../services/stores.services'
import { useNavigate } from 'react-router-dom'

const CreateVoucher = () => {
    const navigate = useNavigate()

    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [minSpend, setMinSpend] = useState(0)
    const [amount, setAmount] = useState(0)
    const [maxDiscount, setMaxDiscount] = useState(0)
    const [code, setCode] = useState('')
    const [startDay, setStartDay] = useState(moment())
    const [expireDay, setExpireDay] = useState(moment())

    const handleSubmit = async () => {
        let info = {
            name, description, minSpend, amount, maxDiscount, code,
            startDay: new Date(startDay).toISOString(),
            expireDay: new Date(expireDay).toISOString(),
            StoreId: storeId
        }
        try {
            const createVoucher = await storeServices.createVoucher(info, token)
            if (createVoucher) {
                navigate("/store/vouchers")
            }
        } catch (error) {
            console.log(error)
        }
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
                            variant="standard"
                            onChange={(e) => setName(e.target.value)}
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
                            onChange={(e) => setCode(e.target.value)}
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
                    onChange={(e) => setDescription(e.target.value)}
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
                            onChange={(e) => setMinSpend(e.target.value)}
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
                            onChange={(e) => setAmount(e.target.value)}
                        >
                        </TextField>
                    </Grid>
                    {/* <Grid item xs={4}>
                        <Select
                            size='small'
                            fullWidth
                        // value={stateOrder}
                        // onChange={handleChange}
                        >
                            <MenuItem key={'VND'} value={'VND'}>
                                <ListItemText primary={'VND'} />
                            </MenuItem>
                            <MenuItem key={'%'} value={'%'}>
                                <ListItemText primary={'%'} />
                            </MenuItem>
                        </Select>
                    </Grid> */}
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
                            onChange={(e) => setMaxDiscount(e.target.value)}
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

export default CreateVoucher
