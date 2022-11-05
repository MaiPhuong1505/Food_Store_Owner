import React, { useState } from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CreateTopping from '../../components/stores/CreateTopping';

const Topping = () => {
  const [openCreateBox, setOpenCreateBox] = useState(false)

  const mainColor = '#89D5C9'
  function createData(stt, name, price) {
    return { stt, name, price };
}
  const openClick = () =>{
    console.log("click")
    setOpenCreateBox(!openCreateBox)
  }

const rows = [
    createData(1, 'Trân châu đen', 5000),
    createData(2, 'Trân châu trắng', 5000),
    createData(3, 'Kem phô mai', 7000),
    createData(4, 'Trứng cút', 3000),
]
  return (
    <Stack 

    alignItems="flex-end"
    sx={{
      paddingY: 3,
      paddingX: '10vw',
    }}>
      <TableContainer component={Paper}>
        <Table size="small" sx={{ minWidth: 600 }} aria-label="simple table">
          <TableHead sx={{ borderBottom: '2px solid black' }}>
            <TableRow>
              <TableCell align="center">STT</TableCell>
              <TableCell align="center">Tên</TableCell>
              <TableCell align="center">Giá</TableCell>
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
                <TableCell align="center">{row.price}đ</TableCell>
                <TableCell align="center">
                  <IconButton
                  // onClick={editClick(row.stt)}
                  >
                    <Edit sx={{ color: mainColor }} />
                  </IconButton>
                  <IconButton>
                    <Delete sx={{ color: '#E25B45' }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {openCreateBox ? 
      <CreateTopping stt={rows.length + 1} /> : null  
    }
      <Button 
      variant='contained' size="large" 
      onClick={openClick}
      sx={{width: 'fit-content', marginTop: 2}}>
      Thêm topping
      </Button>
    </Stack>
  )
}

export default Topping
