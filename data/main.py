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
    data: List[int]

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


def split_series(series, past_num, future_num):
    X = []
    y = []
    i = 0
    for w in range(len(series)):
        past_end = w + past_num
        future_end = past_end + future_num
        if future_end > len(series):
            break
        p, f = series[w:past_end, :], series[past_end:future_end, :]
        X.append(p)
        y.append(f)
    return np.array(X), np.array(y)


past_num = 24
future_num = 24
n_feature = 1
fam = ['temp']


def get_model(data):

    data_array = np.array(data).reshape(-1, 1)
    scaled_use =scaler.fit_transform(data_array)
    
    input_data = np.array(data).reshape((n_feature, future_num, n_feature))
    
    
    filenm = 'pred.pickle'

    model = load_model('rnn.h5')
    print(model.summary())
    y_pred = model.predict(input_data)
    
    #y_pred_reverse = pd.DataFrame(scaler.inverse_transform)

    y_pred_reverse = pd.DataFrame(scaler.inverse_transform(y_pred.reshape((future_num, n_feature))), columns=fam)
    # predict.reshape((future_num, n_feature))), columns=fam)
    print(y_pred_reverse)
    print(type(y_pred_reverse))

    return y_pred_reverse['temp'].tolist()

@app.post('/predict/')
async def predict(request: YourPydanticModel):
    # Process the data, for example, just return it as is
    result = get_model(request.data)
    return {"status": "ok", "result": result}

if __name__ == '__main__':
    app.run(debug=True)