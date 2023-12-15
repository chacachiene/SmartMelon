# SMARTMELON SYSTEM

It is a single-page web application that allows users to manage their IOT devices. This app uses the MERN stack, which consists of MongoDB as the database, Express as the server framework, React as the user interface framework, and Node as the runtime environment. Beside, we also use Python to create a model to forecast the temperature and humidity.

## Features

- Users can log in, register and log out of their accounts.
- Users can view the real-time environment sensor (temperature, humidity, soil moisture, lightning).
- Users can view the charts of these sensors.
- Users can set the threshold for all sensors.
- System can predict 24 hours of temperature and humidity.
- Users can turn on/off the light and pump.
- Users can set the scheduled on/off time for the lights and the pump.
- Users can view the action history of users.


## Requirements

- Node.js version 14.0 or higher
- MongoDB version 4.0 or higher
- NPM version 6.0 or higher

## Installation

1. **Clone Repository:**
   ```bash
   git clone https://github.com/chacachiene/smartmelon.git
2. **Change the env**
- Client
  ```javascript
  REACT_APP_ADAFRUIT_URL = "https://io.adafruit.com/api/v2/"
  REACT_APP_ADAFRUIT_USERNAME = <your adafruit io username>
  REACT_APP_ADAFRUIT_KEY = <your adafruit io key>
  REACT_APP_X_RAPIDAPI_KEY = "4569681f82mshc3cbbf99e2a68b1p1ff677jsnaeb74847ac4e"
  REACT_APP_X_RAPIDAPI_URL = "https://meteostat.p.rapidapi.com/stations/hourly"
  REACT_APP_X_RAPIDAPI_HOST = "meteostat.p.rapidapi.com"
- Server
  ```javascript
  PORT = 5000
  MONGO_URL = <your MongoDB url>
  JWT_SECRET = <something>
  
2. **Install dependencies Repository:**
- Run the command `npm install` to install the dependencies for both the `client` and `server` directories.
  ```bash
  npm install
- Run the command `npm start` to start both the server and the user interface.
  ```bash
  npm start

3. **Start python server:**
   ```bash
   cd AIModel
   .\env\Scripts\activate
   python -m uvicorn main:app  --reload
4. **Start the app**
- Access the address `http://localhost:3000` to use the app.


## Contact

If you have any questions, suggestions or bug reports, please contact me via email: phat.nguyennpk1311@hcmut.edu.vn
