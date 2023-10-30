import datetime
from ..dto.beacon import *
from ..dbconnection import DBConnection

class DAO_Beacon:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_all_beacons(self) -> list[Beacon]:
        beacon_list = []
        query = 'SELECT * FROM `BEACONS`'

        for beacon in self.db.efa(query):
            beacon_list.append(Beacon(beacon))

        return beacon_list

    def select_beacon(self, beacon_id: str) -> Beacon | None:
        query = 'SELECT * FROM `BEACONS` WHERE `beacon_id` = %s'
        beacon = self.db.efo(query, (beacon_id))
        if beacon is not None:
            return Beacon(beacon)
        else:
            return None
    
    def insert_beacon(self,
                      beacon_id: str,
                      name: str,
                      type: str,
                      lat: float,
                      lng: float,
                      group: str,
                      purpose: str,
                      office: str,
                      install_date: datetime.datetime,
                      color: str,
                      light_color: str,
                      light_characteristic: str,
                      light_period: str,
                      image: bytes = None,
                      embedding: bytes = None):
        query = 'INSERT INTO `BEACONS` (beacon_id, beacon_name, beacon_type, beacon_lat, beacon_lng,\
        beacon_group, beacon_purpose, beacon_office, beacon_installDate, beacon_color,\
            beacon_lightColor, beacon_lightCharacteristic, beacon_lightSignalPeriod, beacon_image, beacon_embedding)\
                values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)'
        
        try:
            self.db.ec(query, (beacon_id, name, type, lat,
                lng, group, purpose, office, install_date, color, light_color,
                light_characteristic, light_period, image, embedding))
            return True
        except:
            return False
    
    def update_beacon_image(self, beacon_id: str, image: bytes):
        query = 'UPDATE `BEACONS` SET `beacon_image` = %s WHERE `beacon_id` = %s'
        try:
            self.db.ec(query, (image, beacon_id))
            return True
        except:
            return False

    def update_beacon_embedding(self, beacon_id: str, embedding: bytes):
        query = 'UPDATE `BEACONS` SET beacon_embedding = %s WHERE beacon_id = %s'
        try:
            self.db.ec(query, (embedding, beacon_id))
            return True
        except:
            return False