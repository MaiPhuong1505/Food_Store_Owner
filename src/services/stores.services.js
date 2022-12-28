import axios from 'axios'
import api, { BASE_URL } from './api'

export const storeServices = {
    createStore: async (data, id, token) => {
        return await axios.post(
            `${BASE_URL}/CreateStore?OwnerID=${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },

    getStore: async (id, token) => {
        return await api.get(
            `${BASE_URL}/GetStoreByOwner?ownerID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getStoreCategories: async (token) => {
        return await api.get(
            `${BASE_URL}/api/Category/GetStoreCategory`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
    },
    getFoodCategories: async (token) => {
        return await axios.get(
            `${BASE_URL}/api/Category/GetFoodCategory`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getFood: async (id, token) => {
        return await axios.get(
            `${BASE_URL}/api/Food/GetAllFoodByStore?StoreID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createFood: async (storeId, data, token) => {
        return await axios.post(
            `${BASE_URL}/api/Food/${storeId}`,
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
            `${BASE_URL}/api/Food/GetFoodViewMobile?FoodID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateFood: async (id, data, token) => {
        return await axios.put(
            `${BASE_URL}/api/Food/UpdateFood?FoodID=${id}`,
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
            `${BASE_URL}/api/Food/UpdateState?id=${id}&state=${state}`,
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
            `${BASE_URL}/GetToppingActive/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createTopping: async (data, id, token) => {
        return await axios.post(
            `${BASE_URL}/api/Topping/${id}`,
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
            `${BASE_URL}/api/Topping?id=${id}`,
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
            `${BASE_URL}/api/Topping/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getAllOrders: async (id, token) => {
        return await axios.get(
            `${BASE_URL}/api/Order/GetAllOrder?storeID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getOrderDetail: async (id, token) => {
        return await axios.get(
            `${BASE_URL}/api/Order/GetOrderDetails?OrderID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getOrdersByStatus: async (id, status, token) => {
        return await axios.get(
            `${BASE_URL}/api/Order/GetAllOrderByStatus?storeID=${id}&status=${status}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getPagingOrders: async (id, start, end, pageNum, size, query, sortBy, sortType, status, token) => {
        return await axios.get(
            `${BASE_URL}/api/Order/GetPagingOrder?StartDate=${start}&EndDate=${end}&PageNumber=${pageNum}&PageSize=${size}&QueryString=${query}&SortBy=${sortBy}&SortType=${sortType}&storeID=${id}&status=${status}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateOrderStatus: async (id, status, token) => {
        return await axios.put(
            `${BASE_URL}/api/Order?status=${status}&idOrder=${id}`, {},
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
            `${BASE_URL}/GetPagingStoreVoucher?PageNumber=${pageNum}&PageSize=${size}&StartDate=${start}&EndDate=${end}&QueryType=${queryType}&QueryString=${query}&SortBy=${sortBy}&SortType=${sortType}&storeID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createVoucher: async (data, token) => {
        return await axios.post(
            `${BASE_URL}/AddVoucher`,
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
            `${BASE_URL}/GetVoucherByID?ID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateVoucher: async (data, token) => {
        return await axios.put(
            `${BASE_URL}/UpdateVoucher`,
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
            `${BASE_URL}/DeleteVoucher?voucherId=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getMonthRevenue: async (id, month, year, token) => {
        return await axios.get(
            `${BASE_URL}/api/Revenue/Revenue?storeID=${id}&month=${month}&year=${year}&paymentMethod=All`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getBestSellingFood: async (id, month, year, token) => {
        return await axios.get(
            `${BASE_URL}/api/Revenue/BestSellingFood?storeID=${id}&month=${month}&year=${year}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getMonthOrders: async (id, startDate, endDate, token) => {
        return await axios.get(
            `${BASE_URL}/api/Order/GetOrderByDate?StoreID=${id}&dateStart=${startDate}&endStart=${endDate}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getRevenueOfYear: async (id, year, token) => {
        return await axios.get(
            `${BASE_URL}/api/Revenue/RevenueOfYear?storeID=${id}&year=${year}&paymentMethod=All`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getReviews: async (id, pageNum, size, token) => {
        return await axios.get(
            `${BASE_URL}/GetPaging?PageNumber=${pageNum}&PageSize=${size}&storeID=${id}`,
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