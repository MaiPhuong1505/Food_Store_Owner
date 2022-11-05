import LogoOrange from '../../../../assets/images/LogoOrange.png'
import React, { useState } from 'react';
import '../../../../css/header.css'
import {
    NavLink,
    Link
} from "react-router-dom";
import { Typography } from '@mui/material';


function Header() {
    let activeStyle = {
        color: "#FF8357",
        paddingBottom: '15px',
        borderBottom: 'solid 5px #FF8357'
    };

    // const [isLogin, setIsLogin] = useState(false)
    let isLogin = false
    const userName = localStorage.getItem("Name")
    // const token = localStorage.getItem("AccessToken")

    if (userName) {
        isLogin = true
    }

    return (
        <header>
            <div className='container'>
                <img src={LogoOrange} style={{ width: 60 }} alt="Logo" />
                <Link exact="true" to="/"><span className='brand'>Foorder</span></Link>
            </div>
            <nav>
                <ul className="nav__links">
                    <li>TP. Đà Nẵng</li>
                    <li>
                        <NavLink to="/downloadLink" style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            Đặt đồ ăn ngay
                        </NavLink>
                    </li>
                    {isLogin ?
                        <li>
                            <NavLink exact="true" to="/store"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >Cửa hàng của bạn
                            </NavLink>
                        </li>
                        :
                        <li>
                            <NavLink exact="true" to="/introduction"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            >Đăng ký bán hàng
                            </NavLink>
                        </li>
                    }

                </ul>
            </nav>
            {isLogin ? <><Typography>{userName}</Typography> <Typography>Đăng xuất</Typography></> : <Link to="/login">Đăng nhập</Link>}


        </header>
    );
}

export default Header;
