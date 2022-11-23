import { Skeleton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { storeServices } from '../../services/stores.services'

const NewOrder = () => {

  const [ordersQuantity, setOrdersQuantity] = useState(0)
  const [isLoading, setLoading] = useState(true)

  const storeId = localStorage.getItem("StoreId")
  const token = localStorage.getItem("AccessToken")
  const mainColor = "#89D5C9"

  const getNewOrder = async (id, status, token) => {
    try {
      const newOrders = await storeServices.getOrdersByStatus(id, status, token)
      if (newOrders.data) {
        setOrdersQuantity(newOrders.data.length)
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNewOrder(storeId, 'Ordered', token)
  }, [])

  return (
    <Typography>
      {isLoading ? <Skeleton /> :
        <>
          Cửa hàng đang có {ordersQuantity} đơn hàng chưa được xử lý
          <Link to="/store/orders" style={{ color: mainColor, marginLeft: 20 }}>Xem ngay</Link>
        </>
      }

    </Typography>
  )
}

export default NewOrder
