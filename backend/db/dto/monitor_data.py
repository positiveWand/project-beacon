from .data_model import DataModel

class MonitorData(DataModel):
    attr_map = {
        'beacon_id': 'beacon',
        'latest_sd_id': 'sensor_data'
    }

    def __init__(self, beacon: str, sensor_data: str):
        self.beacon = beacon
        self.sensor_data = sensor_data

        self.attr_map = MonitorData.attr_map

    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.beacon = dictionary['beacon_id']
        self.sensor_data = dictionary['latest_sd_id']

        self.attr_map = MonitorData.attr_map
