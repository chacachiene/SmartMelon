import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pumpButton: 0,
    lightButton:  0,
};

export const buttonReducer = createSlice({
    name: "button",
    initialState,
    reducers: {
        setPumpButton: (state, action) => {
            state.pumpButton = action.payload;
        },
        setLightButton: (state, action) => {
            state.lightButton = action.payload;
        },
    },
});

export const { setPumpButton, setLightButton } = buttonReducer.actions;
export default buttonReducer.reducer;