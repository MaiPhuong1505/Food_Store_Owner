import React, { useState } from 'react'
import { Delete, Edit } from '@mui/icons-material';
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import CreateTopping from '../../components/stores/CreateTopping';
import { useEffect } from 'react';
import { storeServices } from '../../services/stores.services';

const Topping = () => {
  const [openCreateBox, setOpenCreateBox] = useState(false)

  const mainColor = '#89D5C9'

  const openClick = () => {
    console.log("click")
    setOpenCreateBox(!openCreateBox)
  }

  const [toppingList, setToppingList] = useState([])
  useEffect(() => {
    async function getTopping(storeId, token) {
      try {
        const toppingData = await storeServices.getTopping(storeId, token)
        if (toppingData) {
          console.log(toppingData.data)
          setToppingList(toppingData.data)
        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    const token = localStorage.getItem("AccessToken")
    const storeId = localStorage.getItem("StoreId")
    getTopping(storeId, token)
  }, [])

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
            {toppingList.map((topping, stt) => (
              <TableRow
                key={topping.ID}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{++stt}</TableCell>
                <TableCell align="center">{topping.Name}</TableCell>
                <TableCell align="center">{topping.Price}đ</TableCell>
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
        <CreateTopping /> : null
      }
      <Button
        variant='contained' size="large"
        onClick={openClick}
        sx={{ width: 'fit-content', marginTop: 2 }}>
        Thêm topping
      </Button>
    </Stack>
  )
}

export default Topping
