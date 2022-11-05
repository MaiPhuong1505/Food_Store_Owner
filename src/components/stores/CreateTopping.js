import { Save } from '@mui/icons-material';
import { TextField, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const CreateTopping = ({stt}) => {
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
                        <TableCell align="center">{stt}</TableCell>
                        <TableCell align="center">
                            <TextField size='small' placeholder='Tên topping' />
                        </TableCell>
                        <TableCell align="center">
                        <TextField size='small' placeholder='Giá' />
                        </TableCell>
                        <TableCell align="center">
                            <Button variant="outlined" endIcon={<Save/>}>
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
