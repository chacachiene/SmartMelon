import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import { useEffect, useState } from 'react';


const username = "chacachien";
const key = "aio_VBab50G5rUkfUQn0ObAbMB13V5hb";


async function getData (feed_id){
        const url = `https://io.adafruit.com/api/v2/${username}/feeds/${feed_id}/data/last`;
        const options = {
                headers: {
                    'X-AIO-Key': key
                }
            };
        let res = await axios.get(url, options);
        return res.data.value;
}


const initialState = {
        temp: null,
        // hum: null,
};

export const sensorReducer = createSlice({
        name: "sensor",
        initialState,
        reducers: {
                setTemp: (state, action) => {
                        state.temp = action.payload;
                },
                // setHum: (state, action) => {
                //     state.hum = action.payload;
                // },
        },
});


export const useSensorData = () => {
    const [sensorData, setSensorData] = useState(initialState);
    
    useEffect(() => {
        const fetchData = async () => {
            const temp = await getData("temp");
            setSensorData({ ...sensorData, temp });
        };
        
        fetchData();
    }, []);
    
    return sensorData;
};
export const { setTemp, setHum } = sensorReducer.actions;
export default sensorReducer.reducer;
