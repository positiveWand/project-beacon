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
            columns = ', '.join(target_column)
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

    def select_sensor_data_limit(self, beacon_id: str, limit: int, target_column: list[str]=None) -> list[SensorData]:
        sensor_data_list = []
        if target_column is None or len(target_column) == 0:
            query = f'SELECT * FROM sensor_data WHERE beacon_id = %s ORDER BY regist_time DESC'
            for sensor_data in self.db.efm(query, (beacon_id), limit):
                sensor_data_list.append(SensorData(sensor_data))
        else:
            columns = ', '.join(target_column)
            query = f'SELECT {columns} FROM sensor_data WHERE beacon_id = %s ORDER BY regist_time DESC'
            for sensor_data in self.db.efm(query, (beacon_id), limit):
                sensor_data_list.append(SensorData(sensor_data))

        return list(reversed(sensor_data_list))

    def select_sensor_data_latest(self, beacon_id: str) -> SensorData | None:
        query = 'SELECT * FROM `SENSOR_DATA` WHERE beacon_id = %s AND regist_time = (SELECT MAX(regist_time) FROM `SENSOR_DATA`)'
        latest = self.db.efo(query, (beacon_id))
        if latest is not None:
            return SensorData(latest)
        else:
            return None
    
    def select_count_sensor_data(self, beacon_id: str = None) -> int:
        if beacon_id is not None:
            query = 'SELECT COUNT(*) as count FROM `SENSOR_DATA` WHERE beacon_id = %s'
            return self.db.efo(query, (beacon_id))['count']
        else:   
            query = 'SELECT COUNT(*) as count FROM `SENSOR_DATA`'
            return self.db.efo(query)['count']
    
    def select_max_id_sensor_data(self) -> int:
        query = 'SELECT MAX(sd_id) as max_id FROM `SENSOR_DATA`'
        result = self.db.efo(query)['max_id']
        if result == None:
            return -1
        else:
            return result
        
    def insert_sensor_data(self, sensor_data: SensorData):
        query = 'INSERT INTO `SENSOR_DATA` (sd_id, beacon_id, regist_time,\
                lantern_status, racon_status, battery_status, charger_status, solar_status,\
                datalogger_status, spare_status, main_volt_status, sub_volt_status,\
                solar_volt_status, wind_volt_status, wave_volt_status, charger_volt_status,\
                battery_volt_status, spare_volt_status, ais_curr_status, lantern_curr_status,\
                datalogger_curr_status, spare_curr_status, wind_speed_status, wind_direct_status,\
                air_temper_status, humidity_status, dew_point_status, air_pressure_status, horizon_visibl_status,\
                water_level_status, current1_status, current2_status, current3_status,\
                wave_height_status, wave_drc_status, swell_height_status, swell_drc_status,\
                water_temper_status, precipi_type_status, salinity_status, ice_status, heat_prostr_status,\
                heliograph_status, oxygen_status, oxygen_satur_status, ph_status, chlorophyll_status,\
                muddiness_status, precipi_status, charger_curr_status, discharger_curr_status\
                )\
                values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        
        try:
            self.db.ec(query,
                       (sensor_data.id,
                        sensor_data.beacon,
                        sensor_data.regist_time,
                        sensor_data.lantern_status,
                        sensor_data.racon_status,
                        sensor_data.battery_status,
                        sensor_data.charger_status,
                        sensor_data.solar_status,
                        sensor_data.datalogger_status,
                        sensor_data.spare_status,
                        sensor_data.main_volt_status,
                        sensor_data.sub_volt_status,
                        sensor_data.solar_volt_status,
                        sensor_data.wind_volt_status,
                        sensor_data.wave_volt_status,
                        sensor_data.charger_volt_status,
                        sensor_data.battery_volt_status,
                        sensor_data.spare_volt_status,
                        sensor_data.ais_curr_status,
                        sensor_data.lantern_curr_status,
                        sensor_data.datalogger_curr_status,
                        sensor_data.spare_curr_status,
                        sensor_data.wind_speed_status,
                        sensor_data.wind_direct_status,
                        sensor_data.air_temper_status,
                        sensor_data.humidity_status,
                        sensor_data.dew_point_status,
                        sensor_data.air_pressure_status,
                        sensor_data.horizon_visibl_status,
                        sensor_data.water_level_status,
                        sensor_data.current1_status,
                        sensor_data.current2_status,
                        sensor_data.current3_status,
                        sensor_data.wave_height_status,
                        sensor_data.wave_drc_status,
                        sensor_data.swell_height_status,
                        sensor_data.swell_drc_status,
                        sensor_data.water_temper_status,
                        sensor_data.precipi_type_status,
                        sensor_data.salinity_status,
                        sensor_data.ice_status,
                        sensor_data.heat_prostr_status,
                        sensor_data.heliograph_status,
                        sensor_data.oxygen_status,
                        sensor_data.oxygen_satur_status,
                        sensor_data.ph_status,
                        sensor_data.chlorophyll_status,
                        sensor_data.muddiness_status,
                        sensor_data.precipi_status,
                        sensor_data.charger_curr_status,
                        sensor_data.discharger_curr_status
                        ))
            return True
        except:
            return False
