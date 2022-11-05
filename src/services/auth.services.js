import axios from 'axios'


export const authService = {
    login: async (data) => {
        return await axios.post('https://takefoodauthentication.azurewebsites.net/SignIn',data) 
    },
    register : async (data) => {
        return await axios.post('https://takefoodauthentication.azurewebsites.net/SignUp',data)
     }
}

 
