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
        query = 'SELECT `prediction_type`, `prediction_content` FROM `prediction_logs` WHERE `prediction_id` IN (SELECT CAST(MAX(CAST(prediction_id as UNSIGNED)) as NCHAR) FROM `prediction_logs` GROUP BY beacon_id) and beacon_id = %s'

        for aPrediction in self.db.efa(query, (beacon_id)):
            prediction_list.append(Prediction(aPrediction))

        return prediction_list
    
    def select_max_prediction_id(self) -> str:
        query = 'SELECT MAX(CAST(PREDICTION_ID as SIGNED)) as max FROM `PREDICTION_LOGS`'

        result = self.db.efo(query)

        return result['max']
    
    def insert_prediction(self, prediction_id: str, beacon_id: str, type: str, predict_time: datetime.datetime, content: str):
        query = 'INSERT `PREDICTION_LOGS` (PREDICTION_ID, PREDICTION_TYPE, BEACON_ID, PREDICTION_TIME, PREDICTION_CONTENT) VALUES(%s, %s, %s, %s, %s)'

        try:
            self.db.ec(query, (prediction_id, type, beacon_id, predict_time, content))
            return True
        except:
            return False