import axios from 'axios'


export const authService = {
    login: async (data) => {
        return await axios.post('https://takefoodauthentication.azurewebsites.net/SignIn', data)
    },
    register: async (data) => {
        return await axios.post('https://takefood-authentication.azurewebsites.net/SignUp', data)
    },
    forgetPass: async (data) => {
        return await axios.get(`https://takefood-authentication.azurewebsites.net/ForgetPass?gmail=${data}`)
    },
    renewPass: async (data) => {
        return await axios.post('https://takefood-authentication.azurewebsites.net/RenewPassword', data)
    },
}


