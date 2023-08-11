from .dataobject import DataObject
from .coordinate import Coordinate

class BeaconFull(DataObject):
    def __init__(self, beacon_id = None, beacon_lat = None, beacon_lng = None, beacon_name = 'noname', beacon_type = None, beacon_group = None, beacon_purpose=None, \
                 beacon_office=None, beacon_installDate  = None, beacon_color = None, \
                    beacon_lightColor = None, beacon_lightCharacteristic =None, beacon_lightSignalPeriod =None):
        # super().__init__()
        self.beacon_id = beacon_id
        self.beacon_lat = beacon_lat
        self.beacon_lng = beacon_lng
        self.beacon_name = beacon_name
        self.beacon_type = beacon_type
        self.beacon_group = beacon_group
        self.beacon_purpose = beacon_purpose
        self.beacon_office = beacon_office
        self.beacon_installDate = beacon_installDate
        self.beacon_color = beacon_color
        self.beacon_lightColor = beacon_lightColor
        self.beacon_lightCharacteristic = beacon_lightCharacteristic
        self.beacon_lightSignalPeriod = beacon_lightSignalPeriod

    def pyData(self):
        return{
            "beacon_id": self.beacon_id,
            "beacon_name": self.beacon_name,
            "beacon_type": self.beacon_type,
            "beacon_lat": self.beacon_lat,
            "beacon_lng": self.beacon_lng,
            "beacon_group": self.beacon_group,
            "beacon_purpose": self.beacon_purpose,
            "beacon_office": self.beacon_office,
            "beacon_installDate": self.beacon_installDate,
            "beacon_color": self.beacon_color,
            "beacon_lightColor": self.beacon_lightColor,
            'beacon_lightCharacteristic':self.beacon_lightCharacteristic,
            "beacon_lightSignalPeriod": self.beacon_lightSignalPeriod
        }