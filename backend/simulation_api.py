from flask import request, current_app
from db.dao.dao import DAO_Universal
import datetime
import time
import pandas as pd
from model.predict import Predict

def insert_anomaly_probability():
    dao: DAO_Universal = current_app.config.get('DAO')
    beacon_id = request.args.get('beacon_id')
    probability = request.args.get('probability')

    max_id = dao.select_max_prediction_id()
    max_id = int(max_id) + 1
    result = dao.insert_prediction(
        prediction_id=max_id,
        beacon_id=beacon_id,
        type='simple_probability',
        predict_time=datetime.datetime.now(),
        content=probability)
    
    if result:
        return 'good'
    else:
        return 'bad'

def insert_anomaly_prediction():
    dao: DAO_Universal = current_app.config.get('DAO')
    model: Predict = current_app.config.get('PREDICTION_MODEL')
    beacon_id = request.args.get('beacon_id')
    data_type = request.args.get('type')

    print('fetching data: ', data_type)
    input_data = pd.read_csv(f'./model/data/smart/{data_type}.csv', sep=',', index_col=0)

    score, probability = model.run(input_data)
    probability = int(probability * 100)
    print('anomaly score:', score)
    print('anomaly probability:', probability)

    max_id = dao.select_max_prediction_id()
    max_id = int(max_id) + 1
    result = dao.insert_prediction(
        prediction_id=max_id,
        beacon_id=beacon_id,
        type='simple_probability',
        predict_time=datetime.datetime.now(),
        content=probability)
    
    if result:
        return 'good'
    else:
        return 'bad'

