import React, { useState } from 'react';
import { Box, useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/material/styles';
import Navbar from 'component/Navbar';
import Sidebar from 'component/Sidebar';
import { Outlet } from 'react-router-dom';



const Layout = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const isPc = useMediaQuery('(min-width: 1000px)');


  return (
    <Box>
      <Navbar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} />
      <Box sx={{ height: '4rem' ,display:'flex'}} >
        <Sidebar openSidebar={openSidebar} setOpenSidebar={setOpenSidebar} isPc={isPc} />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
