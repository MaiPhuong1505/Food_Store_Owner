import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeServices } from '../../services/stores.services';

const ViewFood = () => {
    const [foodList, setFoodList] = useState([])
    const mainColor = '#89D5C9'
    let navigate = useNavigate()

    useEffect(() => {
        async function getFood(storeId, token) {
            try{
                const foodData = await storeServices.getFood(storeId, token)
                if (foodData) {
                    console.log(foodData.data)
                    setFoodList(foodData.data)
                  }
            }catch(error) {
                console.log(error.response.data)
              }
        }
    const token = localStorage.getItem("AccessToken")
        const storeId = localStorage.getItem("StoreId")
        getFood(storeId, token)
    }, [])

    //button them mon moi
    const createClick = () =>{
        navigate("/store/food/createFood")
    }
    // const editClick = (id) => {
    //     navigate(`store/food/updateFood/${id}`)
    // }

    return (
        <>
            <Stack spacing={2} sx={{
                padding: 3
            }}>
                <Box
                    display="flex"
                    justifyContent={"space-between"}>
                    <Typography>
                        Tổng số món ăn: <span style={{ color: mainColor }}>{foodList.length}</span>
                    </Typography>
                    <Button variant='contained' onClick={createClick}>
                    Thêm món
                    </Button>
                </Box>

                <TableContainer component={Paper}>
                    <Table size="small" sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead sx={{ borderBottom: '2px solid black'}}>
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
                            {foodList.map((food, i=0) => (
                                <TableRow
                                    key={food.FoodId}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{++i}</TableCell>
                                    <TableCell align="center">{food.Name}</TableCell>
                                    <TableCell align="left">{food.Dscription}</TableCell>
                                    <TableCell align="center">
                                        <img src={food.UrlImage} style={{height: 100, width: 100, overflow: 'hidden'}}/>
                                    </TableCell>
                                    <TableCell align="center">{food.Price}đ</TableCell>
                                    <TableCell align="center">{food.Category}</TableCell>
                                    <TableCell align="center">{food.ListTopping.join(', ')}</TableCell>
                                    <TableCell align="center">{food.State}</TableCell>
                                    <TableCell align="center">
                                        <IconButton 
                                        // onClick={editClick(row.stt)}
                                        >
                                            <Edit sx={{color: mainColor}}/>
                                        </IconButton>
                                        <IconButton>
                                            <Delete sx={{color: '#E25B45'}}/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
        </>
    )
}

export default ViewFood
