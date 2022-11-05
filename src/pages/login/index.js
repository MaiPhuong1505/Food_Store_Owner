import React, { useState } from 'react'
import './login.css'
import LogoOrange from '../../assets/images/LogoOrange.png'
import { Box, Button, TextField, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { authService } from '../../services/auth.services';
import { useNavigate } from "react-router-dom"

const Login = () => {
    let navigate = useNavigate()

    const [isSignup, setIsSignup] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [phoneNumber, setPhone] = useState("")
    
    async function handleLogin() {
        if (isSignup) {
            let account = {
                name, email, password, phoneNumber
            }
            // console.log(account)
            try {
                const signup = await authService.register(account)
                if (signup){
                    setIsSignup(!isSignup)
                    setPassword("")
                }
            } catch (error) {
                console.log(error.response)
            }
        } else {
            let account = {
                userName: email,
                password: password
            }
            try {
                const login = await authService.login(account);
                if (login.data) {
                    console.log("Login data: ", login.data)
                    localStorage.setItem("UserId", login.data.id)
                    localStorage.setItem("AccessToken", login.data.accessToken)
                    localStorage.setItem("Name", login.data.name)
                    localStorage.setItem("Roles", login.data.roles)
                    var role = localStorage.getItem("Roles")
                    if (role.includes("Owner")) {
                        navigate("/store")
                    } else if (!role.includes("Owner") && role.includes("User")){
                        navigate("/storeRegister")
                    }               
                    
                }
            } catch (error) {
                console.log(error.response.data)
            }
        }
    }
    return (
        <div>
            <div id="heading">
                <img src={LogoOrange} style={{ width: 80 }} alt="Logo" />
                <h1>BẮT ĐẦU CÙNG FOORDER NHÉ</h1>
            </div>
            <div className="splitdiv">
                <div className="leftsplit">
                </div>
                <div className="rightsplit">
                    <form>
                        <Box
                            maxWidth={500}
                            minWidth={400}
                            display="flex"
                            alignItems="center"
                            justifyContent={"center"}
                            flexDirection={"column"}>
                            {isSignup && (
                                <TextField
                                    fullWidth
                                    size='small' margin="normal" type={'text'}
                                    variant='outlined' placeholder='Tên'
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon sx={{ color: "#89D5C9" }} />
                                            </InputAdornment>
                                        ),
                                    }}></TextField>)}
                            <TextField
                                fullWidth
                                size='small' margin="normal" type={'email'}
                                variant='outlined' placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon sx={{ color: "#89D5C9" }} />
                                        </InputAdornment>
                                    ),
                                }}></TextField>
                            <TextField
                                fullWidth
                                size='small' margin="normal" type={'password'}
                                variant='outlined' placeholder='Mật khẩu'
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon sx={{ color: "#89D5C9" }} />
                                        </InputAdornment>
                                    ),
                                }}></TextField>
                            {isSignup && (<TextField
                                fullWidth
                                size='small' margin="normal" type={'text'}
                                variant='outlined' placeholder='Số điện thoại'
                                onChange={(e) => setPhone(e.target.value)}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PhoneIcon sx={{ color: "#89D5C9" }} />
                                        </InputAdornment>
                                    ),
                                }}></TextField>)}
                            <Button
                                onClick={handleLogin}
                                sx={{
                                    margin: 1,
                                    borderRadius: 5,
                                    backgroundColor: "#89D5C9",
                                    fontSize: 16,
                                    fontStyle: "bold"
                                }}
                                variant="contained" >
                                {isSignup ? "ĐĂNG KÝ" : "ĐĂNG NHẬP"}
                            </Button>
                            <div>
                                {isSignup ? "Đã có tài khoản?" : "Chưa có tài khoản?"}

                                <Button
                                    onClick={() => setIsSignup(!isSignup)}
                                    sx={{
                                        fontStyle: "semi-bold",
                                        color: "#89D5C9"
                                    }}
                                >
                                    {isSignup ? "Đăng nhập" : "Đăng ký"}
                                </Button>
                            </div>
                        </Box>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
