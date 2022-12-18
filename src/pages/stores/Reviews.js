import { Star, StarOutline } from '@mui/icons-material'
import { CircularProgress, Divider, Pagination, Paper, Rating, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { storeServices } from '../../services/stores.services'

const Reviews = () => {
    const token = localStorage.getItem("AccessToken")
    const storeId = localStorage.getItem("StoreId")

    const [reviews, setReviews] = useState([])
    const [isLoading, setLoading] = useState(true)

    var pageNumber = 1
    var pageSize = 10

    const [page, setPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(pageSize)
    const [total, setTotal] = useState(0)

    const getReviews = async (id, pageNum, size, token) => {
        try {
            const reviews = await storeServices.getReviews(id, pageNum, size, token)
            if (reviews.data) {
                setReviews(reviews.data.manageReviews)
                setTotal(reviews.data.total)
                setPage(reviews.data.pageIndex)
                setRowsPerPage(reviews.data.pageSize)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (event, newPage) => {
        pageNumber = newPage
        pageSize = rowsPerPage
        setPage(newPage)
        getReviews(storeId, pageNumber, pageSize, token)
    }
    useEffect(() => {
        getReviews(storeId, pageNumber, pageSize, token)
    }, [])

    return (
        <Stack sx={{ margin: 3 }}>
            <Typography>Tổng số review: {total}</Typography>

            {
                isLoading ?
                    <CircularProgress />
                    :
                    <>

                        <Stack component={Paper} elevation={3}
                            sx={{
                                marginY: 3
                            }}>
                            {
                                reviews.map((review) => (
                                    <>
                                        <Box padding={2} key={review.orderID}>
                                            <Typography color={'grey'}>Mã đơn hàng: {review.orderID}</Typography>
                                            <Rating value={review.star} readOnly />
                                            {
                                                review.imgs.length > 0 &&
                                                (
                                                    <Box>
                                                        {review.imgs.map((img) => {
                                                            return (
                                                                <div style={{ height: 100, width: 100, overflow: 'hidden' }}>
                                                                    <img src={img} style={{ height: '100%', width: 'auto' }} />
                                                                </div>
                                                            )
                                                        })}
                                                    </Box>
                                                )
                                            }

                                            <Typography>{review.description}</Typography>
                                        </Box>
                                        <Divider />
                                    </>
                                ))
                            }

                        </Stack>

                    </>
            }
            <Pagination count={Math.ceil(total / rowsPerPage)} page={page} onChange={handleChange}
                sx={{ [`& .MuiPagination-ul`]: { justifyContent: 'center' } }} />
        </Stack>
    )
}

export default Reviews
