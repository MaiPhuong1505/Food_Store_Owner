import React from 'react'
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoOrange from '../../../../assets/images/LogoOrange.png'
import '../../../../css/header.css'

import { NavLink } from 'react-router-dom';
import { LunchDining, Info, ListAlt, Discount, AutoGraph } from '@mui/icons-material';

const Sidebar = () => {
  const iconColor = '#FF8357'
  let activeStyle = {
    background: '#89D5C9',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: 10,
    padding: 8,
    width: '100%',
  }

  return (
    <>
      <Drawer
        sx={{
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: '20%', boxSizing: 'border-box' },
        }}
        variant="permanent"
      >
        <div className='container'>
          <img src={LogoOrange} style={{ width: 60 }} alt="Logo" />
          <span className='brand'>Foorder</span>
        </div>
        <List component={'nav'}>
          <ListItemButton>
            <ListItemIcon>
              <Info sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/store" style={({ isActive }) =>
              isActive ? activeStyle : undefined
            }>Tổng quan cửa hàng</NavLink>
          </ListItemButton>

          {/* Quan ly mon an */}
          <ListItemButton sx={{ mt: 1, paddingBottom: 0 }}>
            <ListItemIcon>
              <LunchDining sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText primary={'Quản lý món ăn'} />
          </ListItemButton>
          <Divider variant="middle" sx={{ borderStyle: 'dashed', borderColor: '#7D7D7E' }} />
          <List sx={{ paddingTop: 0 }}>
            <ListItemButton sx={{ pl: 9 }}>
              <NavLink exact="true" to="/store/food" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Món ăn</NavLink>
            </ListItemButton>

            <Divider variant="middle" sx={{ borderStyle: 'dashed', borderColor: '#7D7D7E' }} />

            <ListItemButton sx={{ pl: 9 }}>
              <NavLink to="/store/topping" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Topping</NavLink>
            </ListItemButton>
          </List>

          {/* Quan ly don hang */}
          <ListItemButton sx={{ mt: 1, paddingBottom: 0 }}>
            <ListItemIcon>
              <ListAlt sx={{ color: iconColor }} />
            </ListItemIcon>
            <ListItemText primary={'Quản lý đơn hàng'} />
          </ListItemButton>
          <Divider variant="middle" sx={{ borderStyle: 'dashed', borderColor: '#7D7D7E' }} />
          <List sx={{ paddingTop: 0 }}>
            <ListItemButton sx={{ pl: 9 }}>
              <NavLink exact="true" to="/" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Đơn hàng</NavLink>
            </ListItemButton>
            <Divider variant="middle" sx={{ borderStyle: 'dashed', borderColor: '#7D7D7E' }} />
            <ListItemButton sx={{ pl: 9 }}>
              <NavLink exact="true" to="/" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Đánh giá</NavLink>
            </ListItemButton>
            <Divider variant="middle" sx={{ borderStyle: 'dashed', borderColor: '#7D7D7E' }} />
            <ListItemButton sx={{ pl: 9 }}>
              <NavLink exact="true" to="/" style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }>Thống kê</NavLink>
            </ListItemButton>
          </List>

          <ListItemButton sx={{ mt: 1 }}>
            <ListItemIcon>
              <Discount sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/">Quản lý voucher</NavLink>
          </ListItemButton>

          {/* <ListItemButton sx={{ mt: 2 }}>
            <ListItemIcon>
              <AutoGraph sx={{ color: iconColor }} />
            </ListItemIcon>
            <NavLink exact="true" to="/">Đăng ký quảng cáo</NavLink>
          </ListItemButton> */}
        </List>
      </Drawer>
    </>
  )
}

export default Sidebar
