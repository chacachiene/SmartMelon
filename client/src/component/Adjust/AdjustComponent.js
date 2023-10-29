import { useState } from "react";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Add, Remove } from "@mui/icons-material";
const AdjustComponent = () => {


    const [count, setCount] = useState(0);

    const handleIncrement = () => {

        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 0)
            setCount(count - 1);
    };
    return (
        <div style={{ width: "100%", }}>
            <ToggleButtonGroup
                color="primary"
                value={count}
                exclusive
                aria-label="Platform"
            >
                <ToggleButton value="web" onClick={handleDecrement}><Remove /></ToggleButton>
                <ToggleButton value="ios" style={{ width: "100px" }}>{count}</ToggleButton>
                <ToggleButton value="ios " onClick={handleIncrement}><Add /></ToggleButton>
            </ToggleButtonGroup>
        </div>

    )
}
export default AdjustComponent