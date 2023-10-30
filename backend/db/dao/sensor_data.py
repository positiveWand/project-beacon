import datetime
from ..dto.sensor_data import  *
from ..dbconnection import DBConnection

class DAO_SensorData:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_sensor_data(self, beacon_id: str, start: datetime.datetime=None, end: datetime.datetime=None, target_column: list[str]=None) -> list[SensorData]:
        sensor_data_list = []
        if target_column is None or len(target_column) == 0:
            if end is not None:
                query = 'SELECT * FROM sensor_data WHERE beacon_id = %s and (regist_time BETWEEN %s AND %s) ORDER BY regist_time'
                for sensor_data in self.db.efa(query, (beacon_id, start, end)):
                    sensor_data_list.append(SensorData(sensor_data))
            else:
                query = 'SELECT * FROM sensor_data WHERE beacon_id = %s and (regist_time >= %s) ORDER BY regist_time'
                # print(query)
                for sensor_data in self.db.efa(query, (beacon_id, start, end)):
                    sensor_data_list.append(SensorData(sensor_data))
        else:
            columns = ' '.join(target_column)
            if end is not None:
                query = f'SELECT {columns} FROM sensor_data WHERE beacon_id = %s and  (regist_time BETWEEN %s AND %s) ORDER BY regist_time'
                # print(query)
                for sensor_data in self.db.efa(query, (beacon_id, start, end)):
                    sensor_data_list.append(SensorData(sensor_data))
            else:
                query = f'SELECT {columns} FROM sensor_data WHERE beacon_id = %s and (regist_time >= %s) ORDER BY regist_time'
                # print(query)
                for sensor_data in self.db.efa(query, (beacon_id, start, end)):
                    sensor_data_list.append(SensorData(sensor_data))

        return sensor_data_list

    def select_sensor_data_latest(self, beacon_id: str) -> SensorData | None:
        query = 'SELECT * FROM `SENSOR_DATA` WHERE beacon_id = %s AND regist_time = (SELECT MAX(regist_time) FROM `SENSOR_DATA`)'
        latest = self.db.efo(query, (beacon_id))
        if latest is not None:
            return SensorData(latest)
        else:
            return None