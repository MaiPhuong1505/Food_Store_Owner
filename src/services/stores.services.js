import axios from 'axios'

export const storeServices = {
    createStore: async (data, id, token) => {
        return await axios.post(
            `https://takefood-apigateway.azurewebsites.net/CreateStore?OwnerID=${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },

    getStore: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/GetStoreByOwner?ownerID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getStoreCategories: async (token) => {
        return await axios.get(
            'https://takefood-apigateway.azurewebsites.net/api/Category/GetStoreCategory',
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    },
    getFoodCategories: async (token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Category/GetFoodCategory`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getFood: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Food/GetAllFoodByStore?StoreID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createFood: async (storeId, data, token) => {
        return await axios.post(
            `https://takefood-apigateway.azurewebsites.net/api/Food/${storeId}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    }
    ,
    getFoodById: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Food/GetFoodViewMobile?FoodID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateFood: async (id, data, token) => {
        return await axios.put(
            `https://takefood-apigateway.azurewebsites.net/api/Food/UpdateFood?FoodID=${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateStateFood: async (id, state, token) => {
        return await axios.put(
            `https://takefood-apigateway.azurewebsites.net/api/Food/UpdateState?id=${id}&state=${state}`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    }
    ,
    getTopping: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/GetToppingActive/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createTopping: async (data, id, token) => {
        return await axios.post(
            `https://takefood-apigateway.azurewebsites.net/api/Topping/${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateTopping: async (id, data, token) => {
        return await axios.put(
            `https://takefood-apigateway.azurewebsites.net/api/Topping?id=${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    deleteTopping: async (id, token) => {
        return await axios.delete(
            `https://takefood-apigateway.azurewebsites.net/api/Topping/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getAllOrders: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Order/GetAllOrder?storeID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getOrderDetail: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Order/GetOrderDetails?OrderID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getOrdersByStatus: async (id, status, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Order/GetAllOrderByStatus?storeID=${id}&status=${status}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getPagingOrders: async (id, start, end, pageNum, size, query, sortBy, sortType, status, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Order/GetPagingOrder?StartDate=${start}&EndDate=${end}&PageNumber=${pageNum}&PageSize=${size}&QueryString=${query}&SortBy=${sortBy}&SortType=${sortType}&storeID=${id}&status=${status}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateOrderStatus: async (id, status, token) => {
        return await axios.put(
            `https://takefood-apigateway.azurewebsites.net/api/Order?status=${status}&idOrder=${id}`, {},
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    }
    ,
    getStoreVouchers: async (id, start, end, pageNum, size, query, queryType, sortBy, sortType, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/GetPagingStoreVoucher?PageNumber=${pageNum}&PageSize=${size}&StartDate=${start}&EndDate=${end}&QueryType=${queryType}&QueryString=${query}&SortBy=${sortBy}&SortType=${sortType}&storeID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createVoucher: async (data, token) => {
        return await axios.post(
            `https://takefood-apigateway.azurewebsites.net/AddVoucher`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getVoucherById: async (id, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/GetVoucherByID?ID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateVoucher: async (data, token) => {
        return await axios.put(
            `https://takefood-apigateway.azurewebsites.net/UpdateVoucher`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    deleteVoucher: async (id, token) => {
        return await axios.delete(
            `https://takefood-apigateway.azurewebsites.net/DeleteVoucher?voucherId=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getMonthRevenue: async (id, month, year, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Revenue/Revenue?storeID=${id}&month=${month}&year=${year}&paymentMethod=All`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getBestSellingFood: async (id, month, year, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Revenue/BestSellingFood?storeID=${id}&month=${month}&year=${year}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getMonthOrders: async (id, startDate, endDate, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Order/GetOrderByDate?StoreID=${id}&dateStart=${startDate}&endStart=${endDate}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getRevenueOfYear: async (id, year, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/api/Revenue/RevenueOfYear?storeID=${id}&year=${year}&paymentMethod=All`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getReviews: async (id, pageNum, size, token) => {
        return await axios.get(
            `https://takefood-apigateway.azurewebsites.net/GetPaging?PageNumber=${pageNum}&PageSize=${size}&storeID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getStoreStatic: async (storeId, year, payment) => {
        return await axios.get(
            `https://takefood-orderservice.azurewebsites.net/api/Revenue/RevenueOfYear?storeID=${storeId}&year=${year}&paymentMethod=${payment}`
        )
    },
}
// https://takefood-apigateway.azurewebsites.net/GetPaging?StartDate=1&EndDate=1&PageNumber=1&PageSize=1&QueryString=1&SortBy=1&SortType=1&storeID=1