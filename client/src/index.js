import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import authReducer from "./state"
import buttonReducer from "state/button_time"
import sensorReducer from "state/sensor"
import thresHoldReducer from "state/threshold"
import visualizeReducer  from "state/visualize"
import notiReducer from "state/noti"
import clockReducer from "state/clock"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist"
import storage from "redux-persist/lib/storage"
import { PersistGate } from "redux-persist/integration/react"

import { combineReducers } from "redux"
import { disableReactDevTools } from "@fvilers/disable-react-devtools"

// deploy
if (process.env.NODE_ENV === "production") {
  disableReactDevTools()
}
const persistConfig = {
  key: "root",
  version: 1,
  storage,
}


const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  button: buttonReducer,
  sensor: sensorReducer,
  threshold: thresHoldReducer,
  noti: notiReducer,
  visualize: visualizeReducer,
  clock: clockReducer,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      }
    }),
  devTools: false
})

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
