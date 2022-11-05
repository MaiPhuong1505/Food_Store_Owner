import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const ViewFood = () => {
    const mainColor = '#89D5C9'
    let navigate = useNavigate()

    //hardcode du lieu
    function createData(stt, name, description, image, price, category, topping, state) {
        return { stt, name, description, image, price, category, topping, state };
    }

    const rows = [
        createData(1, 'Trà sữa socola', 'Mô tả gì đó ghi dài dài vô để test cái độ rộng auto', 
        'https://jarvis.vn/wp-content/uploads/2019/05/tra%CC%80-su%CC%83a-socola.jpg', 
        25000, 'Trà sữa', 'Trân châu đen, Trân châu trắng, Kem phô mai', 'Còn hàng'),
        createData(2, 'Trà sữa dâu', 'Mô tả', 
        'https://cdn.nguyenkimmall.com/images/detailed/746/cach-lam-tra-sua-dau-5.jpg.jpg', 
        25000, 'Trà sữa', 'Trân châu đen, Kem phô mai', 'Còn hàng'),
        createData(3, 'Trà sữa matcha', 'Mô tả', 
        'https://product.hstatic.net/1000383678/product/e72404a9-81c9-4dd9-84a8-9f2669a4fe0d_4d8d47298f404305afa576db3ba5c7f2.jpeg', 
        27000, 'Trà sữa', 'Kem phô mai', 'Còn hàng'),
        createData(4, 'Bánh tráng trộn', 'Mô tả', 
        'https://ngonaz.com/wp-content/uploads/2021/10/banh-trang-tron-1.jpg', 
        15000, 'Ăn vặt', 'Trứng cút, Xoài', 'Còn hàng'),
    ]

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
                        Tổng số món ăn: <span style={{ color: mainColor }}>{rows.length}</span>
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
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center">{row.stt}</TableCell>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="left">{row.description}</TableCell>
                                    <TableCell align="center">
                                        <img src={row.image} style={{height: 100, width: 100, overflow: 'hidden'}}/>
                                    </TableCell>
                                    <TableCell align="center">{row.price}đ</TableCell>
                                    <TableCell align="center">{row.category}</TableCell>
                                    <TableCell align="center">{row.topping}</TableCell>
                                    <TableCell align="center">{row.state}</TableCell>
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
