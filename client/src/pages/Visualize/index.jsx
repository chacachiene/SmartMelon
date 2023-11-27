import React from "react"

import { useSelector } from "react-redux"
import PropTypes from "prop-types"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import ChartPage from "pages/Visualize/ChartPage"
import { DatePicker } from "@mui/x-date-pickers"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  }
}

const Visualize = () => {
  const [value, setValue] = React.useState(0)
  const temp = useSelector((state) => state.visualize.temp)
  const humi = useSelector((state) => state.visualize.humi)
  const light = useSelector((state) => state.visualize.light)
  const mois = useSelector((state) => state.visualize.mois)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: "100vh" }}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        <Tab label="Light" {...a11yProps(0)} />
        <Tab label="Temperature" {...a11yProps(1)} />
        <Tab label="Humity" {...a11yProps(2)} />
        <Tab label="Soil moiture" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ChartPage Namepage="Temperature Status" data={temp} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ChartPage Namepage="Lighting Status" data={light}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ChartPage Namepage="Humity Status" data={humi} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ChartPage Namepage="Soil moiture Status" data={mois}/>
      </TabPanel>
    </Box>
  )
}

export default Visualize