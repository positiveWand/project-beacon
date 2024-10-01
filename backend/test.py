# import pandas as pd

# def classify_time_series(data, window_size=5, threshold=0.01):
#     # Compute a rolling window mean with the specified window size
#     rolling_mean = data.rolling(window=window_size).mean()

#     # Calculate the difference between the original data and the rolling mean
#     diff = data - rolling_mean

#     # Classify the data points based on the threshold
#     result = []
#     for d in diff:
#         if d > threshold:
#             result.append("increase")
#         elif d < -threshold:
#             result.append("decrease")
#         else:
#             result.append("constant")

#     return result

# # Example usage
# data = pd.Series([1.0, 1.2, 1.3, 1.5, 1.4, 1.7, 1.6, 1.4, 1.2, 1.0])
# result = classify_time_series(data, window_size=3, threshold=0.1)

# for i, phase in enumerate(result):
#     print(f"Data point {i}: {phase} Phase")

# print(result[-4:])
# import math

# def anomaly_probability(anomaly_score):
#     # anomaly_score = math.sqrt(anomaly_score)
#     k = 7
#     l = 1/100
#     if(anomaly_score < k):
#         # return anomaly_score/(2 * k)
#         return 1/(1 + math.e ** (-1 * (anomaly_score - k)))
#     else:
#         return 1/(1 + math.e ** (-l * (anomaly_score - k)))
    
# for i in [1,2,3,4,5, 10, 15, 20, 25,30, 50, 100, 150, 200, 250, 300, 400, 500]:
#     print(i, ':', anomaly_probability(i))

import db.dbconnection as dbconnection
import numpy as np
from model.model import AnomalyModel
import pandas as pd
from db.dto.beacon import Beacon
from db.dto.sensor_data import SensorData
from db.dao.dao import DAO_Universal
import math
import datetime

db = dbconnection.DBConnection("local-docker")
dao = DAO_Universal(conn = db)

# def predict_anomaly_score(beacon: Beacon):
#     data_count = dao.select_count_sensor_data(beacon.id)

#     if data_count < 6:
#         return None
#     sensor_data = dao.select_sensor_data_limit(beacon_id=beacon.id, limit=6)
#     hyperparam = beacon.model_hyperparam
    
#     feature_data = {}
#     truth_data = {}



#     model = AnomalyModel()
#     model.set_model(None, hyperparam['feature_list'], beacon.embedding)

#     result = model.predict(sensor_data, truth_data, hyperparam['median'], hyperparam['iqr_range'])

#     return

def predict_anomaly_score(beacon: Beacon):
    data_count = dao.select_count_sensor_data(beacon.id)

    if data_count < 16:
        return None
    
    sensor_data = dao.select_sensor_data_limit(beacon_id=beacon.id, limit=16)
    feature_list = beacon.model_hyperparam['feature_list']
    median = beacon.model_hyperparam['median']
    iqr_range = beacon.model_hyperparam['iqr_range']
    
    feature_data = {feature: [] for feature in feature_list}
    truth_data = {feature: None for feature in feature_list}

    for sd in sensor_data[:-1]:
        for feature in feature_list:
            feature_data[feature].append(sd.to_dict()[feature])
    
    sd = sensor_data[-1]
    for feature in feature_list:
        truth_data[feature] = sd.to_dict()[feature]
    
    # print(feature_data)
    # print(truth_data)

    model = AnomalyModel()
    model.set_model(None, feature_list, beacon.embedding)

    # 각 feature별 anomaly score
    result = model.predict(feature_data, truth_data, median, iqr_range)
    # Beacon의 anomaly score
    anomaly_score = sum(result)

    return anomaly_score

def anomaly_probability(anomaly_score):
    k = 4.5
    b = 1/3
    a = 1/50
    if(anomaly_score < k):
        return 1/(1 + math.e ** (-b * (anomaly_score - k)))
    else:
        return 1/(1 + math.e ** (-a * (anomaly_score - k)))

def predict_test(beacon: Beacon):
    print(f'[Beacon({beacon.id}) anomaly score 예측 수행]')
    
    anomaly_score = predict_anomaly_score(beacon)
    if anomaly_score is None:
        print(f'데이터 부족으로 인한 anomaly score 예측 실패')
    else:
        print(f'Beacon({beacon.id})의 anomaly score: {anomaly_score}')
        anomaly_prob = anomaly_probability(anomaly_score)
        anomaly_prob = int(anomaly_prob * 100)
        print(f'Beacon({beacon.id})의 anomaly probability: {anomaly_prob}%')
        
        new_id = dao.select_max_prediction_id() + 1
        dao.insert_prediction(new_id, beacon.id, 'anomaly_probability', datetime.datetime.now(), str(anomaly_prob))

def check_beacon_hyperparam():
    beacons = dao.select_all_beacons()
    for beacon in beacons:
        print(f'[Beacon({beacon.id}) hyperparam 출력]')
        print(type(beacon.model_hyperparam))
        print(beacon.model_hyperparam)

def delete_all_prediction():
    db.ec('delete from PREDICTION_LOGS')

def delete_all_sensor_data():
    db.ec('delete from SENSOR_DATA')

def insert_test_sensor_data(beacon_id, data_type, count, time_delta=0):
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
    
    new_time = datetime.datetime.now() + datetime.timedelta(0, time_delta)
    for _ in range(count):
        new_id = dao.select_max_id_sensor_data() + 1
        sensor_data.id = new_id
        sensor_data.regist_time = new_time
        
        result = dao.insert_sensor_data(sensor_data)
        new_time += datetime.timedelta(0, 3)
        if not result:
            break
    
    if result:
        return True
    else:
        return False


def scenario1():
    print('테스트-Scenario1 시작')
    check_beacon_hyperparam()

def scenario2():
    print('테스트-Scenario2 시작')
    print('이전 데이터 삭제...')
    delete_all_prediction()
    delete_all_sensor_data()

    beacon = dao.select_all_beacons()[0]
    print(f'Fetched Beacon({beacon.id})')

    print('테스트 데이터 삽입...')
    insert_test_sensor_data(beacon.id, 'normal', 15)
    insert_test_sensor_data(beacon.id, 'normal', 1, 60)

    predict_test(beacon)

def scenario3():
    print('테스트-Scenario3 시작')
    print('이전 데이터 삭제...')
    delete_all_prediction()
    delete_all_sensor_data()

    beacon = dao.select_all_beacons()[0]
    print(f'Fetched Beacon({beacon.id})')

    print('테스트 데이터 삽입...')
    insert_test_sensor_data(beacon.id, 'normal', 15)
    insert_test_sensor_data(beacon.id, 'anomaly1', 1, 60)

    predict_test(beacon)

def scenario4():
    print('테스트-Scenario4 시작')
    print('이전 데이터 삭제...')
    delete_all_prediction()
    delete_all_sensor_data()

    beacon = dao.select_all_beacons()[0]
    print(f'Fetched Beacon({beacon.id})')

    print('테스트 데이터 삽입...')
    insert_test_sensor_data(beacon.id, 'normal', 15)
    insert_test_sensor_data(beacon.id, 'anomaly2', 1, 60)

    predict_test(beacon)

def scenario5():
    print('테스트-Scenario5 시작')
    print('이전 데이터 삭제...')
    delete_all_prediction()
    delete_all_sensor_data()

    beacon = dao.select_all_beacons()[0]
    print(f'Fetched Beacon({beacon.id})')

    print('테스트 데이터 삽입...')
    insert_test_sensor_data(beacon.id, 'normal', 15)
    insert_test_sensor_data(beacon.id, 'anomaly3', 1, 60)

    predict_test(beacon)

def scenario6():
    print('테스트-Scenario6 시작')
    print('이전 데이터 삭제...')
    delete_all_prediction()
    delete_all_sensor_data()

    beacon = dao.select_all_beacons()[0]
    print(f'Fetched Beacon({beacon.id})')

    print('테스트 데이터 삽입...')
    insert_test_sensor_data(beacon.id, 'normal', 15)
    insert_test_sensor_data(beacon.id, 'anomaly4', 1, 60)

    predict_test(beacon)

def scenario7():
    print('테스트-Scenario7 시작')
    print('이전 데이터 삭제...')
    delete_all_prediction()
    delete_all_sensor_data()

    beacon = dao.select_all_beacons()[0]
    print(f'Fetched Beacon({beacon.id})')

    print('테스트 데이터 삽입...')
    insert_test_sensor_data(beacon.id, 'normal', 15)
    insert_test_sensor_data(beacon.id, 'anomaly5', 1, 60)

    predict_test(beacon)

scenario1()
scenario2()
scenario3()
scenario4()
scenario5()
scenario6()
scenario7()