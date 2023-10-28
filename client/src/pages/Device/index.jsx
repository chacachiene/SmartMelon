import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import WaterDropTwoToneIcon from '@mui/icons-material/WaterDropTwoTone';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

const Devices = () => {
    const natigate = useNavigate()
    return (
        <div>
            <Stack direction="row" spacing={40}>
                <h1>Overview devices</h1>
                <div>
                <Stack direction="row" spacing={2}>
                    <Button variant="contained" color="success" size="large">
                    Schedule
                    </Button>
                    <Button variant="contained" color="success" size="large" onClick={()=>natigate('/device/sensors')}>
                    Sensors
                    </Button>
                    <Button variant="contained" color="success" size="large">
                    Controlled Devices
                    </Button>
                </Stack>
                </div>
            </Stack>
            <Box height={30} />
            <Box sx={{display: "flex"}}>
                <Box component="main" sx={{flexGrow: 1, p: 3}}>
            <Stack spacing={8}>
            <Stack direction="row" spacing={2}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                    <Stack direction="row" spacing={2}>
                        <WaterDropIcon/>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        DHT20
                        </Typography>
                    </Stack>
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                    <Stack direction="row" spacing={2}>
                        <WaterDropTwoToneIcon/>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Soil Moisure
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                    <Stack direction="row" spacing={2}>
                        <LightbulbIcon/>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                            Light
                        </Typography>
                    </Stack>
                    <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>
            </Stack>

            <Stack direction="row" spacing={2}>
                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Water Pump
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        LCD Screen
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Lightning
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Container Water
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                    <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>

                <Card sx={{ minWidth: 200 }}>
                    <CardContent>
                        <Typography sx={{ fontSize: 20 }} color="text.secondary" gutterBottom>
                        Yolo:bit
                        </Typography>
                        
                        <Typography variant="body2" sx={{ fontSize: 15 }}>
                        Number of active devices:
                        <br />
                        {'30/30'}
                        </Typography>
                    </CardContent>
                    <CardActions> 
                        <Button size="large" sx={ {fontSize: 20}}>Detail</Button>
                    </CardActions>
                </Card>
            </Stack>
            </Stack>
            </Box>
            </Box>
        </div>
    );
};

export default Devices;