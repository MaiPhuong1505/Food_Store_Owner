import React from 'react'
import { Box, Button, Divider, Grid, ListItemText, MenuItem, Select, TextField, Typography } from '@mui/material'

const CreateVoucher = () => {
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

                <Typography>
                    Tên voucher <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Tên voucher'
                    variant="standard">
                </TextField>
                <Typography sx={{ mt: 1 }}>
                    Mô tả <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    multiline rows={3}
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Nhập mô tả voucher'>
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
                            size='small' fullWidth margin="dense" type={'text'}
                            variant="standard"
                            placeholder='Nhập giá trị đơn hàng tối thiểu'>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>
                            Mức giảm giá <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <TextField                        
                            size='small' fullWidth margin="dense" type={'text'}
                            variant="standard"
                            placeholder='Nhập giá trị'>
                        </TextField>
                    </Grid>
                    <Grid item xs={4}>
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
                    </Grid>
                    <Grid item xs={5}>
                        <Typography>
                            Mức giảm tối đa <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            size='small' fullWidth margin="dense" type={'text'}
                            variant="standard"
                            placeholder='Nhập giá trị'>
                        </TextField>
                    </Grid>
                </Grid>
                <Divider sx={{ border: '2px solid lightgrey', marginY: 2 }} />
                <Grid container>
                    <Grid item xs={6}>
                        <Typography>
                            Ngày áp dụng <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size='small' fullWidth margin="dense" type={'text'}
                            variant="standard">
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>
                        Ngày hết hạn <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            size='small' fullWidth margin="dense" type={'text'}
                            variant="standard">
                        </TextField>
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
                <Button variant='contained'>Lưu</Button>
                <Button variant='outlined'>Thoát</Button>
            </Box>
        </>
    )
}

export default CreateVoucher
