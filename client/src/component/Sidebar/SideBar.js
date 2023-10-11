import React from 'react';

// import {
//     Box,
//     Drawer,
//     List,
//     ListItem,
//     ListItemIcon,
//     ListItemText,
//     IconButton,
//     Typography,
//     useTheme,
//     ListItemButton
// } from '@mui/material'

// import {
//     ChevronLeft,
//     ChevronRightOutlined,
//     HomeOutlined,
//     SettingsOutlined,
//     BarChartOutlined,
//     ExitToAppOutlined
// } from '@mui/icons-material';


// import { useEffect, useState } from 'react';
// import {useLocation, useNavigate} from 'react-router-dom';
// import FlexBetween from 'component/FlexBetween';
// import profileImage from 'assets/profile.jpg';

// const navItems = [
//     {
//         name: "Dashboard",
//         icon: <HomeOutlined />,
//     },
//     {
//         name: "Setting",
//         icon: <SettingsOutlined />,
//     },
//     {
//         name: "Visualize",
//         icon: <BarChartOutlined/>,
//     },
//     {
//         name: "Function",
//         icon: null,
//     },
//     {
//         name: "Logout",
//         icon: <ExitToAppOutlined />,
//     },
// ]


const Sidebar = () => {


    return (
        <div style={{ backgroundColor: '#f2f2f2', height: '100vh', width: '200px' }}>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            <li style={{ padding: '10px' }}>Home</li>
            <li style={{ padding: '10px' }}>About</li>
            <li style={{ padding: '10px' }}>Contact</li>
          </ul>
        </div>
      );
    };

export default Sidebar