import axiosClient from "./axiosClient";

const username = process.env.REACT_APP_ADAFRUIT_USERNAME;
const key = process.env.REACT_APP_ADAFRUIT_KEY;

const options = {
    headers: {
        'X-AIO-Key': key,
    }
};

const sensorAPI = {
    getAll(feed_id){
        const url = `${username}/feeds/${feed_id}/data`;
        return axiosClient.get(url, options);
    },
    getLastValue(feed_id){
        const url = `${username}/feeds/${feed_id}/data/last`;
        return axiosClient.get(url, options);
    },
    deleteValue(feed_id, id){
        const url = `${username}/feeds/${feed_id}/data/${id}`;
        return axiosClient.delete(url, options);
    }
}

export default sensorAPI;