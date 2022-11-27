import LogoOrange from '../../../../assets/images/LogoOrange.png'
import React, { useState } from 'react';
import '../../../../css/header.css'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu } from '@mui/icons-material';


function Header() {
    let activeStyle = {
        color: "#FF8357",
        paddingBottom: '15px',
        borderBottom: 'solid 5px #FF8357'
    };
    let navigate = useNavigate()
    // const [isLogin, setIsLogin] = useState(false)
    let isLogin = false
    const userName = localStorage.getItem("Name")
    // const token = localStorage.getItem("AccessToken")

    if (userName) {
        isLogin = true
    }

    const logout = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        // <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed"
            sx={{ flexDirection: 'inherit', background: 'white', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            {/* <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                >
                    <Menu />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar> */}
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
            {isLogin ?
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography color='black'>{userName}</Typography>
                    <Button style={{ marginLeft: 10 }} onClick={logout}>Đăng xuất</Button></div>
                : <Link to="/login">Đăng nhập</Link>}

        </AppBar>
        // </Box>
        // <header>

        //     <div className='container'>
        //         <img src={LogoOrange} style={{ width: 60 }} alt="Logo" />
        //         <Link exact="true" to="/"><span className='brand'>Foorder</span></Link>
        //     </div>



        // </header>
    );
}

export default Header;
