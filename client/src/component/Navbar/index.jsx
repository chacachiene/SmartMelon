import React from "react"
import { useState } from "react"
import {
  Box,
  IconButton,
  InputBase,
  Select,
  Menu,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Typography,
  Icon,
  Button,
  Badge,
} from "@mui/material"
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Close,
} from "@mui/icons-material"
import Avatar from "@mui/material/Avatar"
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "component/FlexBetween"
import Noti from "pages/Noti"
import Swal from "sweetalert2"
function NavBar() {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const isPc = useMediaQuery("(min-width: 600px)")
  const theme = useTheme()
  const dark = theme.palette.neutral.dark
  const neutrallight = theme.palette.neutral.light
  const priLight = theme.palette.primary.light
  const alt = theme.palette.background.alt
  const name = user.firstName + " " + user.lastName


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
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <Typography
        fontWeight="bold"
        fontSize="clamp(1.5rem, 2vw, 2rem)"
        color="primary"
        paddingLeft="2rem"
        onclick={() => navigate("/dashboard")}
        sx={{
          "&:hover": {
            color: neutrallight,
            cursor: "pointer",
          },
        }}
      >
        SmartMelon
      </Typography>
        

      {isPc && (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: "dark", fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Noti />
          <Help sx={{ fontSize: "25px" }} />
    
          <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
              <React.Fragment>
                <FlexBetween display="flex" justifyContent="right">
                  <Typography sx={{}} >{name}</Typography>
                  <Button {...bindTrigger(popupState)}>
                    <Avatar alt="Remy Sharp" src={`http://localhost:5000/assets/${user.picture}`} />
                  </Button>
                </FlexBetween>
                <Menu {...bindMenu(popupState)}>
                  {/* onClick={popupState.close} maybe use later */}
                  <MenuItem onClick ={handleLogout}>Log Out</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
        </FlexBetween>
      )}

      {!isPc ? (
        <PopupState variant="popover" popupId="demo-popup-menu">
          {(popupState) => (
            <React.Fragment>
              <FlexBetween display="flex" justifyContent="right">
                <Typography sx={{}} >{name}</Typography>
                <Button {...bindTrigger(popupState)}>
                  <Avatar alt="Remy Sharp" src={`http://localhost:5000/assets/${user.picture}`} />
                </Button>
              </FlexBetween>
              <Menu {...bindMenu(popupState)}>
                {/* onClick={popupState.close} maybe use later */}
                <MenuItem>
                  <IconButton onClick={() => dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                      <LightMode sx={{ color: "dark", fontSize: "25px" }} />
                    ) : (
                      <DarkMode sx={{ fontSize: "25px" }} />
                    )}
                  </IconButton>
                </MenuItem>
                <MenuItem onClick={popupState.close}>
                <Noti />
                </MenuItem>
                <MenuItem onClick ={handleLogout}>Logout</MenuItem>
              </Menu>
            </React.Fragment>
          )}
        </PopupState>
      ) : null}
    </FlexBetween>
  )
}

export default NavBar
