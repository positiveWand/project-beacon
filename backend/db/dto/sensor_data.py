from .data_model import DataModel
import datetime

class SensorData(DataModel):
    dateformat = '%Y-%m-%d'
    datetimeformat = '%Y-%m-%d %H:%M:%S'
    attr_map = {
        'sd_id': 'id',
        'beacon_id': 'beacon',
        'regist_time': 'regist_time',
        'lantern_status': 'lantern_status',
        'racon_status': 'racon_status',
        'battery_status': 'battery_status',
        'charger_status': 'charger_status',
        'solar_status': 'solar_status',
        'datalogger_status': 'datalogger_status',
        'spare_status': 'spare_status',
        'main_volt_status': 'main_volt_status',
        'sub_volt_status': 'sub_volt_status',
        'solar_volt_status': 'solar_volt_status',
        'wind_volt_status': 'wind_volt_status',
        'wave_volt_status': 'wave_volt_status',
        'charger_volt_status': 'charger_volt_status',
        'battery_volt_status': 'battery_volt_status',
        'spare_volt_status': 'spare_volt_status',
        'ais_curr_status': 'ais_curr_status',
        'lantern_curr_status': 'lantern_curr_status',
        'datalogger_curr_status': 'datalogger_curr_status',
        'spare_curr_status': 'spare_curr_status',
        'wind_speed_status': 'wind_speed_status',
        'wind_direct_status': 'wind_direct_status',
        'air_temper_status': 'air_temper_status',
        'humidity_status': 'humidity_status',
        'dew_point_status': 'dew_point_status',
        'air_pressure_status': 'air_pressure_status',
        'horizon_visibl_status': 'horizon_visibl_status',
        'water_level_status': 'water_level_status',
        'current1_status': 'current1_status',
        'current2_status': 'current2_status',
        'current3_status': 'current3_status',
        'wave_height_status': 'wave_height_status',
        'wave_drc_status': 'wave_drc_status',
        'swell_height_status': 'swell_height_status',
        'swell_drc_status': 'swell_drc_status',
        'water_temper_status': 'water_temper_status',
        'precipi_type_status': 'precipi_type_status',
        'salinity_status': 'salinity_status',
        'ice_status': 'ice_status',
        'heat_prostr_status': 'heat_prostr_status',
        'heliograph_status': 'heliograph_status',
        'oxygen_status': 'oxygen_status',
        'oxygen_satur_status': 'oxygen_satur_status',
        'ph_status': 'ph_status',
        'chlorophyll_status': 'chlorophyll_status',
        'muddiness_status': 'muddiness_status',
        'precipi_status': 'precipi_status',
        'charger_curr_status': 'charger_curr_status',
        'discharger_curr_status': 'discharger_curr_status'
    }

    def set_all_data(self,
                 id: str = '',
                 beacon: str = '',
                 regist_time: datetime.datetime = datetime.datetime.now(),
                 lantern_status: float = 0,
                 racon_status: float = 0,
                 battery_status: float = 0,
                 charger_status: float = 0,
                 solar_status: float = 0,
                 datalogger_status: float = 0,
                 spare_status: float = 0,
                 main_volt_status: float = 0,
                 sub_volt_status: float = 0,
                 solar_volt_status: float = 0,
                 wind_volt_status: float = 0,
                 wave_volt_status: float = 0,
                 charger_volt_status: float = 0,
                 battery_volt_status: float = 0,
                 spare_volt_status: float = 0,
                 ais_curr_status: float = 0,
                 lantern_curr_status: float = 0,
                 datalogger_curr_status: float = 0,
                 spare_curr_status: float = 0,
                 wind_speed_status: float = 0,
                 wind_direct_status: float = 0,
                 air_temper_status: float = 0,
                 humidity_status: float = 0,
                 dew_point_status: float = 0,
                 air_pressure_status: float = 0,
                 horizon_visibl_status: float = 0,
                 water_level_status: float = 0,
                 current1_status: float = 0,
                 current2_status: float = 0,
                 current3_status: float = 0,
                 wave_height_status: float = 0,
                 wave_drc_status: float = 0,
                 swell_height_status: float = 0,
                 swell_drc_status: float = 0,
                 water_temper_status: float = 0,
                 precipi_type_status: float = 0,
                 salinity_status: float = 0,
                 ice_status: float = 0,
                 heat_prostr_status: float = 0,
                 heliograph_status: float = 0,
                 oxygen_status: float = 0,
                 oxygen_satur_status: float = 0,
                 ph_status: float = 0,
                 chlorophyll_status: float = 0,
                 muddiness_status: float = 0,
                 precipi_status: float = 0,
                 charger_curr_status: float = 0,
                 discharger_curr_status: float = 0):
        self.id = id
        self.beacon = beacon
        self.regist_time = regist_time
        self.lantern_status = lantern_status
        self.racon_status = racon_status
        self.battery_status = battery_status
        self.charger_status = charger_status
        self.solar_status = solar_status
        self.datalogger_status = datalogger_status
        self.spare_status = spare_status
        self.main_volt_status = main_volt_status
        self.sub_volt_status = sub_volt_status
        self.solar_volt_status = solar_volt_status
        self.wind_volt_status = wind_volt_status
        self.wave_volt_status = wave_volt_status
        self.charger_volt_status = charger_volt_status
        self.battery_volt_status = battery_volt_status
        self.spare_volt_status = spare_volt_status
        self.ais_curr_status = ais_curr_status
        self.lantern_curr_status = lantern_curr_status
        self.datalogger_curr_status = datalogger_curr_status
        self.spare_curr_status = spare_curr_status
        self.wind_speed_status = wind_speed_status
        self.wind_direct_status = wind_direct_status
        self.air_temper_status = air_temper_status
        self.humidity_status = humidity_status
        self.dew_point_status = dew_point_status
        self.air_pressure_status = air_pressure_status
        self.horizon_visibl_status = horizon_visibl_status
        self.water_level_status = water_level_status
        self.current1_status = current1_status
        self.current2_status = current2_status
        self.current3_status = current3_status
        self.wave_height_status = wave_height_status
        self.wave_drc_status = wave_drc_status
        self.swell_height_status = swell_height_status
        self.swell_drc_status = swell_drc_status
        self.water_temper_status = water_temper_status
        self.precipi_type_status = precipi_type_status
        self.salinity_status = salinity_status
        self.ice_status = ice_status
        self.heat_prostr_status = heat_prostr_status
        self.heliograph_status = heliograph_status
        self.oxygen_status = oxygen_status
        self.oxygen_satur_status = oxygen_satur_status
        self.ph_status = ph_status
        self.chlorophyll_status = chlorophyll_status
        self.muddiness_status = muddiness_status
        self.precipi_status = precipi_status
        self.charger_curr_status = charger_curr_status
        self.discharger_curr_status = discharger_curr_status
        
        self.attr_map = SensorData.attr_map
        self.dateformat = SensorData.dateformat

    def __init__(self, dictionary={}):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.id = dictionary['sd_id']
        self.beacon = dictionary['beacon_id']
        self.regist_time = dictionary['regist_time']
        self.lantern_status = dictionary['lantern_status']
        self.racon_status = dictionary['racon_status']
        self.battery_status = dictionary['battery_status']
        self.charger_status = dictionary['charger_status']
        self.solar_status = dictionary['solar_status']
        self.datalogger_status = dictionary['datalogger_status']
        self.spare_status = dictionary['spare_status']
        self.main_volt_status = dictionary['main_volt_status']
        self.sub_volt_status = dictionary['sub_volt_status']
        self.solar_volt_status = dictionary['solar_volt_status']
        self.wind_volt_status = dictionary['wind_volt_status']
        self.wave_volt_status = dictionary['wave_volt_status']
        self.charger_volt_status = dictionary['charger_volt_status']
        self.battery_volt_status = dictionary['battery_volt_status']
        self.spare_volt_status = dictionary['spare_volt_status']
        self.ais_curr_status = dictionary['ais_curr_status']
        self.lantern_curr_status = dictionary['lantern_curr_status']
        self.datalogger_curr_status = dictionary['datalogger_curr_status']
        self.spare_curr_status = dictionary['spare_curr_status']
        self.wind_speed_status = dictionary['wind_speed_status']
        self.wind_direct_status = dictionary['wind_direct_status']
        self.air_temper_status = dictionary['air_temper_status']
        self.humidity_status = dictionary['humidity_status']
        self.dew_point_status = dictionary['dew_point_status']
        self.air_pressure_status = dictionary['air_pressure_status']
        self.horizon_visibl_status = dictionary['horizon_visibl_status']
        self.water_level_status = dictionary['water_level_status']
        self.current1_status = dictionary['current1_status']
        self.current2_status = dictionary['current2_status']
        self.current3_status = dictionary['current3_status']
        self.wave_height_status = dictionary['wave_height_status']
        self.wave_drc_status = dictionary['wave_drc_status']
        self.swell_height_status = dictionary['swell_height_status']
        self.swell_drc_status = dictionary['swell_drc_status']
        self.water_temper_status = dictionary['water_temper_status']
        self.precipi_type_status = dictionary['precipi_type_status']
        self.salinity_status = dictionary['salinity_status']
        self.ice_status = dictionary['ice_status']
        self.heat_prostr_status = dictionary['heat_prostr_status']
        self.heliograph_status = dictionary['heliograph_status']
        self.oxygen_status = dictionary['oxygen_status']
        self.oxygen_satur_status = dictionary['oxygen_satur_status']
        self.ph_status = dictionary['ph_status']
        self.chlorophyll_status = dictionary['chlorophyll_status']
        self.muddiness_status = dictionary['muddiness_status']
        self.precipi_status = dictionary['precipi_status']
        self.charger_curr_status = dictionary['charger_curr_status']
        self.discharger_curr_status = dictionary['discharger_curr_status']

        self.attr_map = SensorData.attr_map
        self.dateformat = SensorData.dateformat
        self.datetimeformat = SensorData.datetimeformat