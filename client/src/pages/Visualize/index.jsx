import React from 'react';
import { sensorReducer } from 'state/sensor';
import { useSelector } from 'react-redux';


const Visualize = () => {
    const sensor = useSelector((state) => state.temp);
    console.log(sensor);

    return (
        <div>
            <h1>Visualize Page</h1>
            <p>This is the visualize page.</p>
            sensor: {sensor}
        </div>
    );
};

export default Visualize;
