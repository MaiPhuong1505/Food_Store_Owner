import axios from 'axios'

export const storeServices = {
    createStore: async (data, id, token) => {
        return await axios.post(
            `https://takefoodstoreservice.azurewebsites.net/CreateStore?OwnerID=${id}`,
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
            `https://takefoodstoreservice.azurewebsites.net/GetStoreByOwner?ownerID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getCategories: async () => {
        return await axios.get(
            'https://takefoodstoreservice.azurewebsites.net/api/Category/GetStoreCategory',
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
                }
            })
    },
    getFood: async (id, token) => {
        return await axios.get(
            `https://takefoodstoreservice.azurewebsites.net/api/Food/GetAllFoodByStore?StoreID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createFood: async (storeId, data, token) => {
        return await axios.post(
            `https://takefoodstoreservice.azurewebsites.net/api/Food/${storeId}`,
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
            `https://takefoodstoreservice.azurewebsites.net/api/Food/GetFoodViewMobile?FoodID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    updateFood: async (id, data, token) => {
        return await axios.put(
            `https://takefoodstoreservice.azurewebsites.net/api/Food?FoodID=${id}`,
            data,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    deleteFood: async (id, token) => {
        return await axios.delete(
            `https://takefoodstoreservice.azurewebsites.net/api/Food?id=${id}`,
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
            `https://takefoodstoreservice.azurewebsites.net/GetToppingActive/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    createTopping: async (data, id, token) => {
        return await axios.post(
            `https://takefoodstoreservice.azurewebsites.net/api/Topping/${id}`,
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
            `https://takefoodstoreservice.azurewebsites.net/api/Topping?id=${id}`,
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
            `https://takefoodstoreservice.azurewebsites.net/api/Topping/${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getOrders: async (id, token) => {
        return await axios.get(
            `https://takefood-orderservice.azurewebsites.net/api/Order/GetAllOrder?storeID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getOrderDetail: async (id, token) => {
        return await axios.get(
            `https://takefood-orderservice.azurewebsites.net/api/Order/GetOrderDetails?OrderID=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    },
    getVouchers: async (id, token) => {
        return await axios.get(
            `https://takefoodvoucherservice.azurewebsites.net/GetVoucher?storeId=${id}`,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }
        )
    }
}