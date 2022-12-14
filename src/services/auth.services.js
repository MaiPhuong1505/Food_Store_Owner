import axios from 'axios'


export const authService = {
    login: async (data) => {
        return await axios.post('https://takefood-authentication.azurewebsites.net/SignIn', data)
    },
    register: async (data) => {
        return await axios.post('https://takefood-authentication.azurewebsites.net/SignUp', data)
    }
}


