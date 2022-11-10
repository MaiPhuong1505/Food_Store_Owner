import React from 'react'
import { Box, Button, Checkbox, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material'
import UploadImage from '../../components/stores/UploadImage'
import SellIcon from '@mui/icons-material/Sell';
import ListIcon from '@mui/icons-material/List';
import GrainIcon from '@mui/icons-material/Grain';
import InventoryIcon from '@mui/icons-material/Inventory';
import ToppingFood from '../../components/stores/ToppingFood';
import CategorySelect from '../../components/stores/CategorySelect';
import { storeServices } from '../../services/stores.services'
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

const UpdateFood = () => {

    const { id } = useParams()

    const ownerId = localStorage.getItem("UserId")
    const storeId = localStorage.getItem("StoreId")
    const token = localStorage.getItem("AccessToken")

    const navigate = useNavigate()

    const [foodInfo, setFoodInfo] = useState({})

    const [imageURL, setImageURL] = useState('')

    const [categoryID, setCategoryID] = useState('')
    const [toppingList, setToppingList] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target
        setFoodInfo(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const getFoodInfo = async () => {
        try {
            const food = await storeServices.getFoodById(id, token)
            if (food.data) {
                setFoodInfo(food.data)
                setCategoryID(food.data.Category)
                setImageURL(food.data.UrlImage)
                console.log(food.data)
            }
        } catch (error) {

        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        getFoodInfo()
    }, [])


    const getImageURL = (url) => {
        setImageURL(url)
    }

    const getToppingSelected = (toppings) => {
        setToppingList(toppings)
    }

    const getCategory = (categoryId) => {
        setCategoryID(categoryId)
    }

    const handleSubmit = async () => {
        const ListTopping = toppingList.map((topping) => ({
            'ID': topping
        }))

        let info = {
            Name: foodInfo.Name,
            Description: foodInfo.Dscription,
            Price: foodInfo.Price,
            CategoryID: categoryID,
            UrlImage: imageURL,
            State: foodInfo.State === 'active',
            ListTopping
        }

        try {
            const food = await storeServices.updateFood(storeId, info, token)
            if (food) {
                navigate('/store/food')
            }
        } catch (error) {

        }
    }

    const [loading, setLoading] = useState(true)
    if (loading) {
        return (
            <div style={{ alignSelf: 'center' }}>
                <CircularProgress />
            </div>
        )
    }

    const selectedTopping = foodInfo.ListTopping.map((item) => item.ID)

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

                <UploadImage OwnerID={ownerId} getData={getImageURL} selectedURL={foodInfo.UrlImage} height='10vw' width='10vw' />

                <Divider sx={{ marginY: 2 }} />
                <Typography>
                    Tên món ăn <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Tên món ăn'
                    variant="standard"
                    value={foodInfo.Name || ''}
                    name='Name'
                    onChange={handleChange}>
                </TextField>
                <Typography>
                    Mô tả <span style={{ color: "#E25B45" }}>*</span>
                </Typography>
                <TextField
                    size='small' fullWidth margin="dense" type={'text'}
                    placeholder='Nhập mô tả sản phẩm'
                    variant="standard"
                    value={foodInfo.Dscription || ''}
                    name='Dscription'
                    onChange={handleChange}>
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
                            value={foodInfo.Price || ''}
                            name='Price'
                            onChange={handleChange}>
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
                        <CategorySelect getData={getCategory} categoryId={foodInfo.Category} />
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
                        <ToppingFood getData={getToppingSelected} toppingIds={selectedTopping} />
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
                        <Checkbox
                            checked={foodInfo.State === 'active'}
                            onChange={(e) => {
                                setFoodInfo(prev => ({
                                    ...prev,
                                    State: e.target.checked ? 'active' : 'inactive'
                                }))
                            }}></Checkbox>
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

export default UpdateFood
