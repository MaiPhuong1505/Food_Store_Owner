import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import LogoOrange from '../../assets/images/LogoOrange.png'
import theme from '../../theme'

const PendingStatus = () => {
    return (
        <div > 
            <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
            margin={'auto'}
            height={'100vh'}
            >
                <img src={LogoOrange} style={{ width: 100 }} alt="Logo" />
                <Typography align='center' variant='h4' 
                sx={{ fontWeight: "bold" }}
                color={theme.palette.primary.main}>
                    YÊU CẦU CỦA BẠN ĐANG ĐƯỢC XỬ LÝ,
                </Typography>
                <Typography align='center' variant='h4' 
                sx={{ color: "#89D5C9", fontWeight: "bold"  }}>
                    FOORDER SẼ LIÊN LẠC ĐỂ LÀM VIỆC VỚI BẠN SỚM.
                </Typography>
                <Typography align='center' variant='h4' 
                sx={{ color: "#89D5C9", fontWeight: "bold"  }}>
                    XIN CẢM ƠN!
                </Typography>                   
            </Box>
        </div>
    )
}

export default PendingStatus

