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
    }
}