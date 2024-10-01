from flask import current_app
from db.dao.dao import DAO_Universal
from db.dto.beacon import Beacon
from model.model import AnomalyModel
import math

def predict_anomaly_score(beacon: Beacon, dao: DAO_Universal):
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