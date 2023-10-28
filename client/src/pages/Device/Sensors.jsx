import React from 'react';
import { Box } from '@mui/material';
import SensorList from './SensorList';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
const Sensors = () => {
    const listName = [
        { label: 'DHT20'},
    ]
    return (
        <div>
            <Box height={10} />
            <Box sx={{display: "flex"}}>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <Stack direction="row" spacing={40}>
                        <h1>Sensors Status</h1>
                        <div>
                        <Stack direction="row" spacing={2}>
                            <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={listName}
                            sx={{ width: 200 }}
                            renderInput={(params) => <TextField {...params} label="Name" />}
                            />
                            <Button variant="contained" color="success" size="large" >
                            Add Sensors
                            </Button>
                            <Button variant="contained" color="success" size="large">
                            Delete Sensors
                            </Button>
                        </Stack>
                        </div>
                    </Stack>
                </Box>
            </Box>
            <Box   
                display="flex"
                alignItems="center"
                justifyContent="center"
                height="60vh"
            >
            <Box height={30} />
            <Box sx={{display: "flex"}}>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
                    <SensorList />
                </Box>
            </Box>
            </Box>
        </div>
    );
};

export default Sensors;