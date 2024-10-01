from .subtask import *
import datetime
from db.dbconnection import DBConnection

def predict_all_anomaly():
    db = DBConnection("local-docker")
    dao = DAO_Universal(conn = db)

    beacons = dao.select_all_beacons()
    print(f'Starting batch task - predict_all_anomaly')
    for beacon in beacons:
        print(f'Predicting anomaly score of Beacon({beacon.id})...')
        score = predict_anomaly_score(beacon, dao)

        if score is None:
            print(f'데이터 부족으로 인한 anomaly score 예측 실패')
        else:
            print(f'Beacon({beacon.id})의 anomaly score: {score}')
            probability = anomaly_probability(score)
            probability = int(probability * 100)
            print(f'Beacon({beacon.id})의 anomaly probability: {probability}%')

            new_id = dao.select_max_prediction_id() + 1
            dao.insert_prediction(new_id, beacon.id, 'anomaly_probability', datetime.datetime.now(), str(probability))