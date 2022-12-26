import LogoOrange from '../../../../assets/images/LogoOrange.png'
import React from 'react';
import '../../../../css/header.css'
import {
    NavLink,
    Link,
    useNavigate
} from "react-router-dom";
import { AppBar, Button, Typography } from '@mui/material';
import { Download, Group, LocationOn, Storefront } from '@mui/icons-material';
import { secondColor } from '../../../../consts';


function Header() {
    let activeStyle = {
        color: secondColor,
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
                    <li>
                        <LocationOn sx={{ color: secondColor }} />TP. Đà Nẵng
                    </li>
                    <li>
                        <NavLink to="/downloadLink" style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }>
                            <Download sx={{ color: secondColor }} /> Đặt đồ ăn ngay
                        </NavLink>
                    </li>
                    {isLogin ?
                        <li>
                            <NavLink exact="true" to="/store"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            > <Storefront sx={{ color: secondColor }} /> Cửa hàng của bạn
                            </NavLink>
                        </li>
                        :
                        <li>
                            <NavLink exact="true" to="/introduction"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : undefined
                                }
                            > <Group sx={{ color: secondColor }} /> Đăng ký bán hàng
                            </NavLink>
                        </li>
                    }

                </ul>
            </nav>
            {isLogin ?
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography color='black'>{userName}</Typography>
                    <Button style={{ marginLeft: 10 }} onClick={logout}>Đăng xuất</Button></div>
                : <Link to="/login" className='login-button'>Đăng nhập</Link>}

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
