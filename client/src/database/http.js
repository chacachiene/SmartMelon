import axios from 'axios';


const username = "chacachien";
const key = "aio_VBab50G5rUkfUQn0ObAbMB13V5hb";


async function getData (feed_id){
    const url = `https://io.adafruit.com/api/v2/${username}/feeds/${feed_id}/data/last`;
    const options = {
        headers: {
          'X-AIO-Key': key
        }
      };
    let res = await axios.get(url, options);
    return res.data.value;
}

