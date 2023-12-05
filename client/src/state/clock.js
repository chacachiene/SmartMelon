import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pump: [],
    light:  [],
};

export const clockReducer = createSlice({
    name: "clock",
    initialState,
    reducers: {
        setPumpTime: (state, action) => {
            state.pump = action.payload;
        },
        setLightTime: (state, action) => {
            state.light = action.payload;
        },
    },
});

export const { setPumpTime, setLightTime } = clockReducer.actions;
export default clockReducer.reducer;