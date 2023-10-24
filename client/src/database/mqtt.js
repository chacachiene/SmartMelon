import mqtt from "precompiled-mqtt";

const username = "chacachien";
const key = "aio_dpXP60nAuSu6Qpl0r0Ov94WG0y8O";

const options = {
  port: 443,
  protocol: 'mqtt',
};

const client = mqtt.connect(
  `mqtt://${username}:${key}@io.adafruit.com`,
  options
);

client.on("connect", () => {
  console.log("connected");
});

client.on("disconnect", () => {
    console.log("disconnected");
});

client.on("message", (topic, message, packet) => {
    console.log("received message" + topic+ ': '+ message);
});

const listDevice = ['led', 'pump', 'temp', 'humi'];

for(const device of listDevice){
    const url = `${username}/feeds/${device}`;
    const subscribeCallback = () => {
        console.log(`subscribed to ${url}`);
    };
    client.subscribe(url, subscribeCallback);
}

export default client;
export function publish(feed, data) {
    client.publish(username + "/feeds/" + feed,data,()=>{
        console.log("Published to " + feed+ " : " + data);
    })
}