import { Block, Cached, Edit } from '@mui/icons-material';
import { Button, CircularProgress, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mainColor } from '../../consts';
import { storeServices } from '../../services/stores.services';

const ViewFood = () => {
    const [foodList, setFoodList] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [stateArr, setStateArr] = useState([])

    const token = localStorage.getItem("AccessToken")
    const storeId = localStorage.getItem("StoreId")

    let navigate = useNavigate()
    var foodState = []

    useEffect(() => {
        async function getFood(storeId, token) {
            try {
                const foodData = await storeServices.getFood(storeId, token)
                if (foodData) {
                    setFoodList(foodData.data)
                    foodData.data.map((food) => foodState = [...foodState, food.State])
                    setStateArr(foodState)
                }
            } catch (error) {
                console.log(error.response)
            } finally {
                setLoading(false)
            }
        }
        getFood(storeId, token)
    }, [foodState])

    //button them mon moi
    const createClick = () => {
        navigate("/store/food/createFood")
    }
    const editClick = (id) => {
        navigate(`/store/food/updateFood/${id}`)
    }

    const handleChangeState = (id, state, index) => {
        const updateStateFood = async () => {
            try {
                const updatedFood = await storeServices.updateStateFood(id, state, token)
                if (updatedFood) {
                    let stateMsg = ''
                    if (state) stateMsg = 'Còn hàng'
                    else stateMsg = 'Hết hàng'
                    foodState = stateArr
                    foodState[index] = stateMsg
                    setStateArr(foodState)
                }
            } catch (error) {
                console.log(error)

            }
        }
        var message = ''
        if (state) message = "Món ăn này đã có hàng trở lại?"
        else message = "Món ăn này đã hết hàng?"
        if (window.confirm(message)) {
            updateStateFood(id, state, token)
        } else return
    }

    return (

        <Stack spacing={2} sx={{
            padding: 3
        }}>
            {
                isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                        <Box
                            display="flex"
                            justifyContent={"space-between"}>
                            <Typography>
                                Tổng số món ăn: <span style={{ color: mainColor }}>{foodList.length}</span>
                            </Typography>
                            <Button variant='contained' onClick={createClick} sx={{ background: mainColor }}>
                                Thêm món
                            </Button>
                        </Box>

                        <TableContainer component={Paper}>
                            <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                                <TableHead sx={{ borderBottom: '2px solid black' }}>
                                    <TableRow>
                                        <TableCell align="center">STT</TableCell>
                                        <TableCell align="center">Tên</TableCell>
                                        <TableCell align="center">Mô tả</TableCell>
                                        <TableCell align="center">Hình ảnh</TableCell>
                                        <TableCell align="center">Giá</TableCell>
                                        <TableCell align="center">Danh mục</TableCell>
                                        <TableCell align="center">Topping</TableCell>
                                        <TableCell align="center">Trạng thái</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {foodList.map((food, i = 0) => (
                                        <TableRow
                                            key={food.FoodId}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell align="center">{i + 1}</TableCell>
                                            <TableCell align="center">{food.Name}</TableCell>
                                            <TableCell align="left">{food.Dscription}</TableCell>
                                            <TableCell align="center" >
                                                <div style={{ height: 100, width: 100, overflow: 'hidden' }}>
                                                    <img src={food.UrlImage} style={{ height: '100%', width: 'auto' }} />
                                                </div>

                                            </TableCell>
                                            <TableCell align="center">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(food.Price)}</TableCell>
                                            <TableCell align="center">{food.Category}</TableCell>
                                            <TableCell align="center">
                                                {food.ListTopping.map((topping) =>
                                                    topping.name
                                                ).join(', ')}
                                            </TableCell>
                                            <TableCell align="center">{stateArr[i]}</TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    onClick={() => editClick(food.FoodId)}
                                                >
                                                    <Edit sx={{ color: mainColor }} />
                                                </IconButton>
                                                {
                                                    stateArr[i] === 'Còn hàng' ? (
                                                        <Tooltip title='Chuyển sang hết hàng'>
                                                            <IconButton onClick={() => handleChangeState(food.FoodId, false, i)}>
                                                                <Block sx={{ color: '#E25B45' }} />
                                                            </IconButton>
                                                        </Tooltip>

                                                    ) :
                                                        (
                                                            <Tooltip title='Chuyển sang còn hàng'>
                                                                <IconButton onClick={() => handleChangeState(food.FoodId, true, i)}>
                                                                    <Cached sx={{ color: mainColor }} />
                                                                </IconButton>
                                                            </Tooltip>
                                                        )
                                                }

                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </>
                )
            }

        </Stack>

    )
}

export default ViewFood
