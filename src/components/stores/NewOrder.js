import { Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NewOrder = () => {
  const storeId = localStorage.getItem("StoreId")
  const mainColor = "#89D5C9"

  const getNewOrder = () => {

  }

  return (
    <Typography>
      Cửa hàng đang có 1 đơn hàng chưa được xử lý
      <Link to="/store/orders" style={{ color: mainColor, marginLeft: 20 }}>Xem ngay</Link>
    </Typography>
  )
}

export default NewOrder
