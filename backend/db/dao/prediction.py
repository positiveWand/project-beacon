from ..dto.prediction import  *
from ..dbconnection import DBConnection

class DAO_Prediction:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_prediction(self, beacon_id: str, type: str=None, start: datetime.datetime=None, end: datetime.datetime=None) -> list[Prediction]:
        prediction_list = []

        if start is None:
            query = 'SELECT date_format(prediction_time, "%%Y-%%m-%%d %%H:%%i:%%S") as prediction_time, prediction_type, prediction_content FROM `PREDICTION_LOGS` WHERE `beacon_id` = %s ORDER BY `prediction_time`'

            for aPrediction in self.db.efa(query, (beacon_id)):
                prediction_list.append(Prediction(aPrediction))
        else:
            if end is not None:
                query = 'SELECT date_format(prediction_time, "%%Y-%%m-%%d %%H:%%i:%%S") as prediction_time, prediction_type, prediction_content FROM prediction_logs WHERE beacon_id = %s AND (prediction_time BETWEEN %s AND %s) AND prediction_type = %s ORDER BY prediction_time'
                print(query)
                for aPrediction in self.db.efa(query, (beacon_id, start, end, type)):
                    prediction_list.append(Prediction(aPrediction))
            else:
                query = 'SELECT date_format(prediction_time, "%%Y-%%m-%%d %%H:%%i:%%S") as prediction_time, prediction_type, prediction_content FROM prediction_logs WHERE beacon_id = %s AND prediction_time >= %s AND prediction_type = %s ORDER BY prediction_time'
                print(query)
                for aPrediction in self.db.efa(query, (beacon_id, start, type)):
                    prediction_list.append(Prediction(aPrediction))

        return prediction_list

    def select_prediction_latest(self, beacon_id: str) -> list[Prediction]:
        prediction_list = []
        query = 'SELECT `prediction_type`, `prediction_content` FROM `prediction_logs` WHERE `prediction_id` IN (SELECT MAX(prediction_id) FROM `prediction_logs` GROUP BY beacon_id) and beacon_id = %s'

        for aPrediction in self.db.efa(query, (beacon_id)):
            prediction_list.append(Prediction(aPrediction))

        return prediction_list