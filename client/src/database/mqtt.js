import mqtt from "precompiled-mqtt";

const username = "chacachien";
const key = "aio_yJdY80aM6QZXJYCMzd9rPKkpuC2n";

const options = {
  port: 443,
  protocol: 'mqtt',
};

const client = mqtt.connect(
  `mqtt://${username}:${key}@io.adafruit.com`,
  options
);
client.setMaxListeners(15)
client.on("connect", () => {
  console.log("connected");
});

client.on("disconnect", () => {
    console.log("disconnected");
});

client.on("message", (topic, message, packet) => {
    console.log("received message" + topic+ ': '+ message);
});

const listDevice = ['button.led-button', 'button.pump-button', 'temp','light-sensor','soil-moisture', 'humi','time.pump-time', 'time.led-time', 'threshold.threshold'];

for(const device of listDevice){
    const url = `${username}/feeds/${device}`;
    const subscribeCallback = () => {
        console.log(`subscribed to ${url}`);
    };
    client.subscribe(url, subscribeCallback);
}

export default client;
export function publish(feed, data) {
  console.log("Publishing to " + feed + " : " + data);
    client.publish(username + "/feeds/" + feed,data,()=>{
        console.log("Published to " + feed+ " : " + data);
    })
}
