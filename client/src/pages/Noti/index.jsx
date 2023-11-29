import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Badge,Box } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import { setLightNoti, setHumiNoti,setMoisNoti,setTempNoti,setSum, setDisplay } from "state/noti";
import "./noti.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Noti = () => {
  const dispatch = useDispatch();  
  const light = useSelector((state) => state.sensor.light);
  const temp = useSelector((state) => state.sensor.temp);
  const humi = useSelector((state) => state.sensor.humi);
  const mois = useSelector((state) => state.sensor.mois);

  const lightThreshold = useSelector((state) => state.threshold.light);
  const tempThreshold = useSelector((state) => state.threshold.temp);
  const humiThreshold = useSelector((state) => state.threshold.humi);
  const moisThreshold = useSelector((state) => state.threshold.mois);

  const sum = useSelector((state) => state.noti.sum);
  const [open, setOpen] = useState(false);
  const [numNoti, setNumNoti] = useState(0);


  const countActiveNotifications = () => {
    let count = 0;

    if (light < Number(lightThreshold[0]) || light > Number(lightThreshold[1])) {
      count++;
    }

    if (mois < Number(moisThreshold[0]) || mois > Number(moisThreshold[1])) {
      count++;
    }

    if (humi < Number(humiThreshold[0]) || humi > Number(humiThreshold[1])) {
      count++;
    }

    if (temp < Number(tempThreshold[0]) || temp > Number(tempThreshold[1])) {
      count++;
    }

    return count;
  };

  useEffect(() => {
    const numNoti = countActiveNotifications();
    dispatch(setSum(numNoti));
  }, [light, temp, humi, mois, lightThreshold, tempThreshold, humiThreshold, moisThreshold]);



  // const DisplayNoti = () => {
  //   return (
  //     <>
  //         { light < Number(lightThreshold[0]) && <span className="notification">light {light} is lower than threshold</span>}
  //         { light > Number(lightThreshold[1]) ? <span className="notification">light {light} is higher than threshold</span> : null}
  //         { mois < Number(moisThreshold[0]) ? <span className="notification">mois {mois} is lower than threshold</span> : null}
  //         { mois > Number(moisThreshold[1]) ? <span className="notification">mois {mois} is higher than threshold</span> : null}
  //         { humi <Number(humiThreshold[0]) ? <span className="notification">humi {humi} is lower than threshold</span> : null}
  //         { humi > Number(humiThreshold[1]) ? <span className="notification">humi {humi} is higher than threshold</span> : null}
  //         { temp < Number(tempThreshold[0]) ? <span className="notification">temp {temp} is lower than threshold</span> : null}
  //         { temp > Number(tempThreshold[1]) ? <span className="notification">temp {temp} is higher than threshold</span> : null}
  //     </>
  //   )
  // }

  // const handleRead = () => {

  //   dispatch(setSum(0))

  //   setOpen(false)
  // };


  const showToastMessage = () => {
    if (light < Number(lightThreshold[0]) || light > Number(lightThreshold[1])) {
      
      toast.warning(`Light is ${light > Number(lightThreshold[1]) ? "higher" : "lower"} than threshold`);
    }
    if (mois < Number(moisThreshold[0]) || mois > Number(moisThreshold[1])) {
      toast.warning(`Moisture is ${mois > Number(moisThreshold[1]) ? "higher" : "lower"} than threshold`);
    }
    if (humi < Number(humiThreshold[0]) || humi > Number(humiThreshold[1])) {
      toast.warning(`Humidity is ${humi > Number(humiThreshold[1]) ? "higher" : "lower"} than threshold`);
    }
    if (temp < Number(tempThreshold[0]) || temp > Number(tempThreshold[1])) {
      toast.warning(`Temperature is ${temp > Number(tempThreshold[1]) ? "higher" : "lower"} than threshold`);
    }
  }

  return (
    <Box>
      <Badge badgeContent={sum} color="primary" onClick={showToastMessage} sx={{}}>
        <Notifications sx={{ fontSize: "25px" }} />
      </Badge>

      {/* {open && sum > 0 && (
        <div className="notifications">
          <DisplayNoti />
         
          <button className="nButton" onClick={handleRead}>
            Mark as read
          </button>
        </div>
      )}

      {open && sum==0 && (
        <div className="notifications">
          <span className="notification">All is normal </span>
        </div>
      )} */}

      <ToastContainer position="top-right" autoClose={4000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </Box>
  );
};

export default Noti;
