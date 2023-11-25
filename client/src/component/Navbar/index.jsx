import React from "react"
import { useState } from "react"
import {
  Box,
  IconButton,
  InputBase,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
  Typography,
  Icon,
} from "@mui/material"
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Menu,
  Help,
  Close,
} from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { setMode, setLogout } from "state"
import { useNavigate } from "react-router-dom"
import FlexBetween from "component/FlexBetween"

function NavBar() {
  const [isPcMenu, setIsPcMenu] = useState(true)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)
  const isPc = useMediaQuery("(min-width: 600px)")
  const theme = useTheme()
  const dark = theme.palette.neutral.dark
  const neutrallight = theme.palette.neutral.light
  const priLight = theme.palette.primary.light
  const alt = theme.palette.background.alt

  //const name = `${user.firstName} ${user.lastName}`;
  const name = user.firstName + " " + user.lastName

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <Typography
        fontWeight="bold"
        fontSize="clamp(1.5rem, 2vw, 2rem)"
        color="primary"
        paddingLeft="2rem"
        onClick={() => navigate("/dashboard")}
        sx={{
          "&:hover": {
            color: neutrallight,
            cursor: "pointer",
          },
        }}
      >
        SmartMelon
      </Typography>

      {isPc ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <LightMode sx={{ color: "dark", fontSize: "25px" }} />
            ) : (
              <DarkMode sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <Notifications sx={{ fontSize: "25px" }} />
          <Help sx={{ fontSize: "25px" }} />
          <FormControl variant="standard" value={name}>
            <Select value={name}>
              <MenuItem value={name}>
                <Typography>{name} </Typography>
              </MenuItem>
              <MenuItem onclick={() => dispatch(setLogout())}>
                <Typography>Log Out </Typography>
              </MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton onClick={() => setIsPcMenu(!isPcMenu)}>
          <Menu />
        </IconButton>
      )}

      {isPcMenu && !isPc ? (
        <Box>
          <Box>
            <IconButton onClick={() => setIsPcMenu(!isPcMenu)}>
              <Close />
            </IconButton>
          </Box>

          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <LightMode sx={{ color: "dark", fontSize: "25px" }} />
              ) : (
                <DarkMode sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <Notifications sx={{ fotSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={name}>
              <Select value={name}>
                <MenuItem value={name}>
                  <Typography>{name} </Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  <Typography>Log Out </Typography>
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      ) : null}
    </FlexBetween>
  )
}

export default NavBar
