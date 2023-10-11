import React from "react";
import ReactDOM from "react-dom/client";



import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import DashBoard from "pages/Dashboard/DashBoard";
import Login from "pages/Login/Login";
import SetUp from "pages/Setup/SetUp";
import Visualize from "pages/Visualize/Visualize";
import LayOut from "component/Layout/LayOut";

function App(){

    return (
        <div className="app">
            <BrowserRouter>

                    <Routes>
                        <Route element={<LayOut />}>
                            <Route path="/" element={<Navigate to='/dashboard' replace />} />
                            <Route path="/dashboard" element={<DashBoard />} />
                            <Route path="/setup" element={<SetUp />} />
                            <Route path="/visualize" element={<Visualize />} />
                            <Route path="/login" element={<Login />} />
                        </Route>
                    </Routes>
                    
            </BrowserRouter>
        </div>
    );  
}
export default App;