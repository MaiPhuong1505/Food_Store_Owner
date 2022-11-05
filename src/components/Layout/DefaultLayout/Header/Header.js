import LogoOrange from '../../../../assets/images/LogoOrange.png'
import * as React from 'react';
import '../../../../css/header.css'
import {
    NavLink,
    Link
} from "react-router-dom";


function Header() {
    let activeStyle = {
        color: "#FF8357",
        paddingBottom: '15px',
        borderBottom: 'solid 5px #FF8357'
    };
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
                    <li>
                        <NavLink exact="true" to="/store" 
                        style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                        }
                        >Đăng ký bán hàng
                        </NavLink>
                    </li>
                </ul>
            </nav>
            <Link to="/login">Đăng nhập</Link>

        </header>
    );
}

export default Header;
