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
        anomaly_scores = predict_anomaly_score(beacon, dao)

        if anomaly_scores is None:
            print(f'데이터 부족으로 인한 anomaly score 예측 실패')
        else:
            total_score = sum(anomaly_scores.values())
            print(f'Beacon({beacon.id})의 anomaly score: {total_score}')
            probability = anomaly_probability(total_score)
            probability = int(probability * 100)
            print(f'Beacon({beacon.id})의 anomaly probability: {probability}%')

            new_id = dao.select_max_prediction_id() + 1
            dao.insert_prediction(new_id, beacon.id, 'anomaly_probability', datetime.datetime.now(), str(probability))

            new_id = dao.select_max_prediction_id() + 1
            dao.insert_prediction(new_id, beacon.id, 'anomaly_scores', datetime.datetime.now(), str(anomaly_scores))