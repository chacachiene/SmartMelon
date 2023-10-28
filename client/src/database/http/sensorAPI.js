import axiosClient from "./axiosClient";

const username = "chacachien";
const key = "aio_VBab50G5rUkfUQn0ObAbMB13V5hb";

const options = {
    headers: {
        'X-AIO-Key': key
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
    }
}

export default sensorAPI;