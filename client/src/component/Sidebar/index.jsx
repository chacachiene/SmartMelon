import * as React from "react"
import { styled, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import MuiAppBar from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import CssBaseline from "@mui/material/CssBaseline"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import { useNavigate } from "react-router-dom"
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import Swal from "sweetalert2";
import { useDispatch } from "react-redux"
import { setLogout } from "state"


import {
  Assessment,
  AssessmentOutlined,
  ManageSearchOutlined,
  MemoryOutlined,
  PowerSettingsNewOutlined,
  TuneOutlined,

} from "@mui/icons-material"

const drawerWidth = 320

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }),
)

const key = [
  { text: "Overview", path: "/dashboard" },
  { text: "Energy Management", path: "/visualize/light" },
  { text: "Device", path: "/setup" },
  { text: "Control", path: "/control" },
  { text: "Logout", path: "/login" },
];

export default function SideBar() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const dispatch = useDispatch()


  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, log me out!",
      cancelButtonText: "No, keep me here!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setLogout())
        navigate("/login")
      }
    })
  }
  

  return (
    <Box sx={{
      display: "flex",
    }}>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
              {open ? (
          <>
            <Typography
              fontWeight="bold"
              fontSize="clamp(1.5rem, 2vw, 2rem)"
              color="primary"
              paddingRight="4rem"
              onClick={() => navigate("/dashboard")}
            >
              SmartMelon
            </Typography>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}   
            </IconButton>
          </>
        ) : (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          )}
          
        </DrawerHeader>
        <Divider />
        <List>
          {key.map((item) => (
            <ListItem key={"Overview"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                {...(item.path === "/login" && {
                  onClick: handleLogout} )}
                {...(item.path !== "/login" && {
                  onClick: () => navigate(item.path),
                })}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {item.text === "Overview" && <AssessmentOutlined />}
                  {item.text === "Energy Management" && <AutoGraphIcon />}
                  {item.text === "Device" && <MemoryOutlined />}
                  {item.text === "Control" && <TuneOutlined />}
                  {item.text === "Logout" && <PowerSettingsNewOutlined />}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  )
}
