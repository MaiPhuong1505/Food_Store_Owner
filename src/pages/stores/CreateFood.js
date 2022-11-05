import React from 'react'
import { Box, Button, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material'
import UploadImage from '../../components/stores/UploadImage'
import SellIcon from '@mui/icons-material/Sell';
import ListIcon from '@mui/icons-material/List';
import GrainIcon from '@mui/icons-material/Grain';
import InventoryIcon from '@mui/icons-material/Inventory';
import ToppingFood from '../../components/stores/ToppingFood';
import CategorySelect from '../../components/stores/CategorySelect';

const CreateFood = () => {
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
                <UploadImage height='10vw' width='10vw' />
                <Divider sx={{ marginY: 2 }} />
                <Typography>
                    Tên món ăn <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Tên món ăn'
                    variant="standard">
                </TextField>
                <Typography>
                    Mô tả <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Nhập mô tả sản phẩm'
                    variant="standard">
                </TextField>
                <Divider sx={{ marginY: 2 }} />
                <Grid container spacing={2}>
                    <Grid item xs={5}
                        sx={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            alignContent: 'center',
                        }}>
                        <SellIcon sx={{ color: '#89D5C9' }}></SellIcon>
                        <Typography sx={{ ml: 1 }}>
                            Giá <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <TextField
                            size='small' fullWidth margin="dense" type={'text'}
                            variant="standard">
                        </TextField>
                    </Grid>
                    <Grid item xs={5}
                        sx={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            alignContent: 'center',
                        }}>
                        <ListIcon sx={{ color: '#89D5C9' }}></ListIcon>
                        <Typography sx={{ ml: 1 }}>
                            Danh mục <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={7}
                        sx={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            alignContent: 'center',
                        }}>
                        <CategorySelect/>
                    </Grid>
                    <Grid item xs={5}
                        sx={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            alignContent: 'center',
                        }}>
                        <GrainIcon sx={{ color: '#89D5C9' }}></GrainIcon>
                        <Typography sx={{ ml: 1 }}>
                            Topping <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <ToppingFood/>
                    </Grid>
                    <Grid item xs={5}
                        sx={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            alignContent: 'center',
                        }}>
                        <InventoryIcon sx={{ color: '#89D5C9' }}></InventoryIcon>
                        <Typography sx={{ ml: 1 }}>
                            Trạng thái <span style={{ color: "#E25B45" }}>*</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={7}
                        sx={{
                            display: 'flex',
                            flexFlow: 'wrap',
                            alignItems: 'center',
                        }}>
                        <Typography>
                            Còn hàng
                        </Typography>
                        <Checkbox defaultChecked></Checkbox>
                    </Grid>
                </Grid>
            </Box>
            <Box 
            sx={{ display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-evenly',
            marginBottom: 3 }}>
                <Button variant='contained'>Lưu</Button>
                <Button variant='outlined'>Thoát</Button>
            </Box>
        </>
    )
}

export default CreateFood
