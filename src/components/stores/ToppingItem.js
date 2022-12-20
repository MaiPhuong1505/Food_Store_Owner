import React, { useState, useEffect } from 'react'
import { IconButton, TableCell, TableRow, TextField, } from '@mui/material';
import { Close, Delete, Edit, Save } from '@mui/icons-material';
import { storeServices } from '../../services/stores.services';

const ToppingItem = ({ topping, stt, deleteFunc }) => {

  const token = localStorage.getItem("AccessToken")

  const [openEdit, setOpenEdit] = useState(false)
  const [editTopping, setEditTopping] = useState(topping)

  // const handleDelete = () => {
  //   async function deleteTopping(toppingId, token) {
  //     try {
  //       const d = await storeServices.deleteTopping(toppingId, token)
  //       if (d) {
  //         getData(toppingId)
  //       }
  //     } catch (error) {
  //       console.log(error.response.data)
  //     }
  //   }

  //   if (window.confirm("Bạn chắc chắn muốn xoá topping này?")) {
  //     deleteTopping(topping.ID, token)
  //   } else return
  // }

  const handleDelete = () => {
    deleteFunc(topping.ID, token)
  }
  const handleEdit = () => {
    setOpenEdit(!openEdit)
  }
  const handleChange = (e) => {
    const { name, value } = e.target
    setEditTopping({
      ...editTopping,
      [name]: value
    })
  }
  const handleKeyDown = (e) => {
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
  useEffect(() => {
    setEditTopping(topping)
  }, [topping])

  const mainColor = '#89D5C9'

  if (!topping) {
    return null
  }
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
        {
          openEdit ?
            (<IconButton onClick={handleSubmit}>
              <Save sx={{ color: mainColor }} />
            </IconButton>) :
            (
              <IconButton onClick={handleEdit} >
                <Edit sx={{ color: mainColor }} />
              </IconButton>
            )
        }
        {
          openEdit ? (
            <IconButton onClick={handleEdit}>
              <Close sx={{ color: 'grey' }} />
            </IconButton>
          ) :
            (
              <IconButton onClick={handleDelete}>
                <Delete sx={{ color: '#E25B45' }} />
              </IconButton>
            )
        }
      </TableCell>
    </TableRow>
  )
}

export default ToppingItem
