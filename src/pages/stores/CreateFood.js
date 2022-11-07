import React from 'react'
import { Box, Button, Checkbox, Divider, Grid, TextField, Typography } from '@mui/material'
import UploadImage from '../../components/stores/UploadImage'
import SellIcon from '@mui/icons-material/Sell';
import ListIcon from '@mui/icons-material/List';
import GrainIcon from '@mui/icons-material/Grain';
import InventoryIcon from '@mui/icons-material/Inventory';
import ToppingFood from '../../components/stores/ToppingFood';
import CategorySelect from '../../components/stores/CategorySelect';
import { useState } from 'react';

const CreateFood = () => {
    const ownerId = localStorage.getItem("UserId")
    const [imageURL, setImageURL] = useState('') 
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0)
    const [categoryID, setCategoryID] = useState('')
    const [topping, setTopping] = useState([])
    const [status, setStatus] = useState(true)

    const getImageURL = (url) => {
        setImageURL(url)
    }

    const getToppingSelected = (toppings) => {
        Object.entries(toppings).map((key, value)=>{
            if (value == true){
                setTopping([
                    ...topping, 
                    {'ID': key}
                ])
            }
        })        
    }

    console.log("topping", topping)
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

                <UploadImage OwnerID={ownerId} fileName={name} getData={getImageURL} height='10vw' width='10vw' />

                <Divider sx={{ marginY: 2 }} />
                <Typography>
                    Tên món ăn <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Tên món ăn'
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}>
                </TextField>
                <Typography>
                    Mô tả <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Nhập mô tả sản phẩm'
                    variant="standard"
                    onChange={(e) => setDescription(e.target.value)}>
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
                            variant="standard"
                            onChange={(e) => setPrice(e.target.value)}>
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
                        <ToppingFood getData={getToppingSelected}/>
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
                        <Checkbox defaultChecked onChange={(e) => setStatus(e.target.checked)}></Checkbox>
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
