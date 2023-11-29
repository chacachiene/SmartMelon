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

    const yesterday = formatDate(beforeDate);
    const options = {
        method: 'GET',
        url: 'https://meteostat.p.rapidapi.com/stations/hourly',
        params: {
          station: '48900',
          start: yesterday,
          end: yesterday,
        },
        headers: {
          'X-RapidAPI-Key': '4569681f82mshc3cbbf99e2a68b1p1ff677jsnaeb74847ac4e',
          'X-RapidAPI-Host': 'meteostat.p.rapidapi.com'
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

