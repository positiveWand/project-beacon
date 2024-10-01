from flask import request, current_app
from db.dao.dao import DAO_Universal
from db.dto.sensor_data import SensorData
import datetime
import time
import pandas as pd
from model.predict import Predict

def insert_sensor_data():
    dao: DAO_Universal = current_app.config.get('DAO')
    beacon_id = request.args.get('beacon_id')
    data_type = request.args.get('type')
    count = int(request.args.get('count'))
    delta = int(request.args.get('delta'))

    sensor_data = SensorData({})
    sensor_data.set_all_data()
    sensor_data.beacon = beacon_id
    if data_type == 'normal':
        sensor_data.charger_status = 1
        sensor_data.main_volt_status = 11.9
        sensor_data.ais_curr_status = 0.36
        sensor_data.charger_curr_status = 0.05
    elif data_type == 'anomaly1':
        sensor_data.charger_status = 1
        sensor_data.main_volt_status = 50
        sensor_data.ais_curr_status = 0.36
        sensor_data.charger_curr_status = 0.05
    elif data_type == 'anomaly2':
        sensor_data.charger_status = 1
        sensor_data.main_volt_status = 100
        sensor_data.ais_curr_status = 0.36
        sensor_data.charger_curr_status = 0.05
    elif data_type == 'anomaly3':
        sensor_data.charger_status = 1
        sensor_data.main_volt_status = 11.9
        sensor_data.ais_curr_status = 3
        sensor_data.charger_curr_status = 0.05
    elif data_type == 'anomaly4':
        sensor_data.charger_status = 1
        sensor_data.main_volt_status = 11.9
        sensor_data.ais_curr_status = 5
        sensor_data.charger_curr_status = 0.05
    elif data_type == 'anomaly5':
        sensor_data.charger_status = 1
        sensor_data.main_volt_status = 11.9
        sensor_data.ais_curr_status = 0.36
        sensor_data.charger_curr_status = 1

    new_time = datetime.datetime.now() + datetime.timedelta(0, delta)
    for _ in range(count):
        new_id = dao.select_max_id_sensor_data() + 1
        sensor_data.id = new_id
        sensor_data.regist_time = new_time
        
        result = dao.insert_sensor_data(sensor_data)
        new_time += datetime.timedelta(0, 3)
        if not result:
            break
    
    if result:
        return 'good'
    else:
        return 'bad'

def insert_anomaly_probability():
    dao: DAO_Universal = current_app.config.get('DAO')
    beacon_id = request.args.get('beacon_id')
    probability = request.args.get('probability')

    max_id = dao.select_max_prediction_id()
    max_id = int(max_id) + 1
    result = dao.insert_prediction(
        prediction_id=max_id,
        beacon_id=beacon_id,
        type='anomaly_probability',
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

