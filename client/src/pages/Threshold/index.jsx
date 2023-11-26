import React, { useState } from "react"
import ThresholdGeneralSetting from "./ThresholdGeneralSetting"
import { publish } from "database/mqtt/mqtt"



const Threshold = () => {

  const handleSubmit = (values) => {
    publish("threshold", values)
  }


  return (
    <div>
      <h1>Threshold Page</h1>
      
      
    </div>
  )
}

export default Threshold
