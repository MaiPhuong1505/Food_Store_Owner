import React, { useState } from 'react'
import '../../css/login.css'
import LogoOrange from '../../assets/images/LogoOrange.png'
import { Box, Button, TextField, Typography, } from '@mui/material'
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import { authService } from '../../services/auth.services';
import { NavLink, useNavigate } from "react-router-dom"

const Login = () => {
  let navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [phoneNumber, setPhone] = useState("")
  // const [helperText, setHelperText] = useState("")
  const [notifyText, setNotifyText] = useState('')

  const validate = (key, values) => {
    // let errors = {}
    // if (!values.email || !values.password) {
    //   errors = 'Required'
    // } else 
    const EMAIL_FORMAT = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const PASSWORD_FORMAT = /^(?=.*\d)(?=.*[a-zA-Z]).{10,}$/
    const PHONE_FORMAT = /^((\+*84)|0)(3|5|7|8|9)+([0-9]{8})$/
    if (key === 'email' && !EMAIL_FORMAT.test(values)) {
      setNotifyText('Email không hợp lệ')
      return true
    }
    if (key === 'password' && !PASSWORD_FORMAT.test(values)) {
      setNotifyText('Mật khẩu phải có ít nhất 10 ký tự, có ký tự chữ, ký tự số và ký tự đặc biệt')
      return true
    }
    if (key === 'phone' && !PHONE_FORMAT.test(values)) {
      setNotifyText('Số điện thoại không hợp lệ')
      return true
    }
    // console.log(Boolean(errors), errors)
    return false
  }

  async function handleLogin() {
    if (isSignup && (!name || !email || !password || !phoneNumber)) {
      setNotifyText('Hãy nhập đầy đủ thông tin')
      return
    } else if (!isSignup && (!email || !password)) {
      setNotifyText('Hãy nhập đầy đủ thông tin')
      return
    }
    if (validate('email', email)) {
      return
    }
    if (validate('password', password)) {
      return
    }
    if (isSignup && validate('phone', phoneNumber)) {
      console.log(validate('phone', phoneNumber))
      return
    }
    if (isSignup) {
      let account = {
        name, email, password, phoneNumber
      }
      try {
        const signup = await authService.register(account)
        if (signup) {
          setIsSignup(!isSignup)
          setPassword("")
        }
      } catch (error) {
        setNotifyText(error.response.data)
      }
    } else {
      let account = {
        userName: email,
        password: password
      }
      try {
        const login = await authService.login(account);
        if (login.data) {
          localStorage.setItem("UserId", login.data.id)
          localStorage.setItem("AccessToken", login.data.accessToken)
          localStorage.setItem("RefreshToken", login.data.refreshToken)
          localStorage.setItem("Name", login.data.name)
          localStorage.setItem("Roles", login.data.roles)
          var role = localStorage.getItem("Roles")
          if (role.includes("Owner")) {
            navigate("/store")
          } else if (!role.includes("Owner") && role.includes("User")) {
            navigate("/storeRegister")
          }
        }
      } catch (error) {
        setNotifyText(error.response.data)
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
              <Typography color='error'>{notifyText}</Typography>
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
                name='email'
                onChange={(e) => {
                  // if (JSON.stringify(validate(e.target.name, e.target.value)) === '{}') {
                  //   setHelperText('')
                  //   setEmail(e.target.value)
                  // } else {
                  //   setHelperText(validate(e.target.value, e.target.value).email)
                  // }
                  setEmail(e.target.value)
                }}
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
                name='password'
                onChange={(e) => {
                  // console.log(e.target.value)
                  // if (JSON.stringify(validate(e.target.name, e.target.value)) === '{}') {
                  //   setHelperText('')
                  //   setPassword(e.target.value)
                  // } else {
                  //   setHelperText(validate(e.target.value, e.target.value).password)
                  // }
                  setPassword(e.target.value)
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PasswordIcon sx={{ color: "#89D5C9" }} />
                    </InputAdornment>
                  ),
                }}></TextField>
              {isSignup && (<TextField
                fullWidth
                size='small' margin="normal" type='number'
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
                {!isSignup && <NavLink to='/forgotPassword' style={{ color: 'lightgrey', fontSize: '0.8rem' }}>Quên mật khẩu?</NavLink>}
              </div>
              <div>
                {isSignup ? "Đã có tài khoản?" : "Chưa có tài khoản?"}

                <Button
                  onClick={() => setIsSignup(!isSignup)}
                  sx={{
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
