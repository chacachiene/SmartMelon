import axios from "axios"

const client = axios.create({
  baseURL: "https://io.adafruit.com/api/v2/",

  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
})

// Add a request interceptor
client.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
client.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response.data
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  },
)

export default client
