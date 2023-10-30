from ..dto.monitor_data import  *
from ..dbconnection import DBConnection

class DAO_MonitorData:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_monitor_data(self, beacon_id: str) -> MonitorData | None:
        query = 'SELECT * FROM `MONITOR_DATA` WHERE beacon_id = %s'
        result = self.db.efo(query, (beacon_id))
        if result is not None:
            return MonitorData(result)
        else:
            return None
    
    def update_monitor_data(self, beacon_id: str, latest_sd_id: str, signal_state: str):
        update_query = 'UPDATE `MONITOR_DATA` SET latest_sd_id = %s, signal_state = %s WHERE beacon_id = %s'
        insert_query = 'INSERT INTO `MONITOR_DATA(beacon_id, latest_sd_id, signal_state) VALUES (%s, %s, %s)`'
        try:
            result = self.db.ec(update_query, (latest_sd_id, signal_state, beacon_id))
            if result == 0:
                self.db.ec(insert_query, (beacon_id, latest_sd_id, signal_state))
            return True
        except:
            return False