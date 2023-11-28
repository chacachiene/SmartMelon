import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'



const temp =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24]

const Test = () => {
    const [value, setValue] = React.useState([])
    const [type, setType] = React.useState("humi")
    useEffect(() => {
                // Assuming you have data to send
            const dataToSend = {
                data: temp,
            }
            // Make a POST request using fetch
            fetch('http://localhost:8000/predict/', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json', // Specify the content type as JSON
                },
                body: JSON.stringify(dataToSend), // Convert the data to JSON string
            })
                .then(response => response.json()) // Parse the JSON response
                .then(result => {
                // Handle the result from the backend
                    console.log("result from python: ",result);
                    setValue(result.result)
                })
                .catch(error => {
                // Handle errors
                console.error('Error:', error);
                });
        }, [])
  return (
    <div>
      <h1>Test</h1>
      {value.map((item) => {
        return (
            <h1>{item}</h1>
        )
      }
        )}
    </div>
    
  )
}
export default Test
