import React, { useState } from 'react'
import { Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import { Delete, Edit, Save } from '@mui/icons-material';
import { storeServices } from '../../services/stores.services';
import { async } from '@firebase/util';


const ToppingItem = ({ topping, stt }) => {

  const token = localStorage.getItem("AccessToken")

  const [openEdit, setOpenEdit] = useState(false)
  const [editTopping, setEditTopping] = useState(topping)


  const handleDelete = (id) => {
    async function deleteTopping(toppingId, token) {
      try {
        const d = await storeServices.deleteTopping(toppingId, token)
        if (d) {
          console.log("xoa dc roi")

        }
      } catch (error) {
        console.log(error.response.data)
      }
    }
    const storeId = localStorage.getItem("StoreId")

    deleteTopping(storeId, token)
  }

  const handleEdit = () => {
    setOpenEdit(!openEdit)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    console.log("name value", name, value)
    setEditTopping({
      ...editTopping,
      [name]: value
    })
  }
  const handleKeyDown = (e) => {
    console.log("key", e.key)
    if (e.key === '-' || e.key === '.') {
      e.preventDefault()
      return
    }
  }
  const handleSubmit = async () => {
    if (topping.Name !== editTopping.Name || topping.Price !== editTopping.Price) {
      await storeServices.updateTopping(topping.ID, editTopping, token)
    }
    setOpenEdit(false)
  }

  const mainColor = '#89D5C9'

  return (
    <TableRow
      key={editTopping.ID}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell align="center">{stt + 1}</TableCell>

      <TableCell align="center">
        {openEdit ? (
          <TextField value={editTopping.Name} onChange={handleChange} name='Name' />
        ) : (editTopping.Name)}
      </TableCell>
      <TableCell align="center">
        {openEdit ? (

          <TextField value={editTopping.Price} onChange={handleChange} name='Price' type='number'
            onKeyDown={handleKeyDown} />
        ) :
          (new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(editTopping.Price))}
      </TableCell>
      <TableCell align="center">
        <IconButton
        >
          {
            openEdit ? <Save sx={{ color: mainColor }} onClick={handleSubmit} /> :
              <Edit sx={{ color: mainColor }} onClick={handleEdit} />
          }

        </IconButton>
        <IconButton onClick={() => handleDelete(topping.ID)}>
          <Delete sx={{ color: '#E25B45' }} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export default ToppingItem
