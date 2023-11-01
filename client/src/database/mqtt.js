import mqtt from "precompiled-mqtt"

const username = process.env.REACT_APP_ADAFRUIT_USERNAME
const key = process.env.REACT_APP_ADAFRUIT_KEY

const options = {
  port: 443,
  protocol: "mqtt",
}

const client = mqtt.connect(`mqtt://${username}:${key}@io.adafruit.com`, options)
client.setMaxListeners(30)
client.on("connect", () => {
  console.log("connected")
})

client.on("disconnect", () => {
  console.log("disconnected")
})

client.on("message", (topic, message, packet) => {
  console.log("received message" + topic + ": " + message)
})

// const listDevice = [
//   "button.led-button",
//   "button.pump-button",
//   "temp",
//   "light-sensor",
//   "soil-moisture",
//   "time.pump-time",
//   "time.led-time",
//   "threshold.threshold",
// ]
const listDevice = [
  "led-button",
  "led-time",
  "light-sensor",
  "soil-moisture",
  "temp-humi",
  "pump-button",
  "pump-time",
  "threshold",
]


for (const device of listDevice) {
  const url = `${username}/feeds/${device}`
  const subscribeCallback = () => {
    console.log(`subscribed to ${url}`)
  }
  client.subscribe(url, subscribeCallback)
}

export default client
export function publish(feed, data) {
  console.log("Publishing to " + feed + " : " + data)
  client.publish(username + "/feeds/" + feed, data, () => {
    console.log("Published to " + feed + " : " + data)
  })
}
