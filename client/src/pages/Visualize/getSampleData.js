import axios from 'axios';


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

export const getSampleData = async ( type) => {
    const currentDate = new Date();
    const beforeDate = new Date();
    beforeDate.setDate(currentDate.getDate() - 1);
    console.log(process.env.REACT_APP_X_RAPIDAPI_URL,process.env.REACT_APP_X_RAPIDAPI_KEY,process.env.REACT_APP_X_RAPIDAPI_HOST)
    const yesterday = formatDate(beforeDate);
    const options = {
        method: 'GET',
        url: process.env.REACT_APP_X_RAPIDAPI_URL,
        params: {
          station: '48900',
          start: yesterday,
          end: yesterday,
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_X_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_X_RAPIDAPI_HOST,
        }
      };

    try {
        const response = await axios.request(options);
        var data =[]
        if (type == 'temp'){
            data = response.data.data.map((item) => item.temp);
        } else if (type == 'humi'){
            data = response.data.data.map((item) => item.rhum);
        } 
        return data;

    } catch (error) {
        console.error(error);
    }
}

// export const getSampleData = async () => {

