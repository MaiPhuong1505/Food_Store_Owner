import React from 'react'
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom'
import Store from './stores'

const RegisterIntroduction = () => {
  // const user = localStorage.getItem("user")
  // let auth = false
  // if (user != null){
  //   auth = true
  // }
  return (
    <div>
      Đăng ký cửa hàng dễ dàng <br/>
      <a href='/store'>Ngay tại đây</a>
      {/* <BrowserRouter>
      <Routes>
        <Route path="/store" element={auth? <Store/> : <Navigate to="/login" replace={true}/>}></Route>
      </Routes>
      </BrowserRouter> */}
    </div>
  )
}

export default RegisterIntroduction
