import { Save } from '@mui/icons-material';
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react'
import { mainColor } from '../../consts';
import { storeServices } from '../../services/stores.services';

const CreateTopping = () => {
    const storeId = localStorage.getItem('StoreId')
    const token = localStorage.getItem('AccessToken')

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    const handleSubmit = async () => {
        let info = {
            Name: name,
            Price: price
        }
        try {
            const topping = await storeServices.createTopping(info, storeId, token)
            if (topping) {
                console.log('Tao topping thanh cong', topping)
            }
        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        // <Box sx={{ 
        //     padding: 3,
        //     backgroundColor: 'white' }}>
        //     <TextField size='small' placeholder='Tên topping'/>
        //     <TextField size='small' placeholder='Giá'/>
        // </Box>
        <TableContainer component={Paper} >
            <Table size="small" sx={{ marginTop: 0, minWidth: 600 }} aria-label="simple table">
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        {/* <TableCell align="center">{stt}</TableCell> */}
                        <TableCell align="center">
                            <TextField size='small' placeholder='Tên topping'
                                onChange={(e) => setName(e.target.value)} />
                        </TableCell>
                        <TableCell align="center">
                            <TextField size='small' placeholder='Giá'
                                onChange={(e) => setPrice(e.target.value)} />
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="outlined" endIcon={<Save />} onClick={handleSubmit} sx={{ color: mainColor }}>
                                Lưu
                            </Button>
                        </TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default CreateTopping
