from fastapi import FastAPI, HTTPException, Depends
from typing import Annotated, List
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.preprocessing import MinMaxScaler
import pandas as pd
import numpy as np
import pickle as pkl
from tensorflow.keras.models import load_model

class YourPydanticModel(BaseModel):
    data: List[float]
    type: str


app = FastAPI()
origins = [
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scaler = MinMaxScaler()

past_num = 24
future_num = 24
n_feature = 1


def get_model(data, type):

    data_array = np.array(data).reshape(-1, 1)
    scaled_use =scaler.fit_transform(data_array)
    
    input_data = np.array(data).reshape((n_feature, future_num, n_feature))
    

    if type == 'Humidity Status':
        model = load_model('humireal.h5')
    elif type == 'Temperature Status':
        model = load_model('tempreal.h5')
    print(model.summary())
    
    y_pred = model.predict(input_data)

    y_pred_reverse = pd.DataFrame(scaler.inverse_transform(y_pred.reshape((future_num, n_feature))))
    print(y_pred_reverse)
    return y_pred_reverse.iloc[:,0].tolist()

@app.post('/predict/')
async def predict(request: YourPydanticModel):
    # Process the data, for example, just return it as is
    result = get_model(request.data, request.type)
    return {"status": "ok", "result": result}

if __name__ == '__main__':
    app.run(debug=True)