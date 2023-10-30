from ..dto.feature import  *
from ..dbconnection import DBConnection

class DAO_Feature:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_features(self, beacon_id: str) -> list[Feature]:
        feature_list = []
        query = 'SELECT * FROM `FEATURES` WHERE `beacon_id` = %s ORDER BY `feature_installDate` DESC'

        for feature in self.db.efa(query, (beacon_id)):
            feature_list.append(Feature(feature))

        return feature_list

    def insert_feature(self, feature_id: str, beacon_id: str, feature_type: str, 
                       feature_installDate: datetime, feature_uninstallDate: datetime):
        query = "INSERT INTO `features` (feature_id, beacon_id, feature_type, feature_installDate,\
          feature_uninstallDate) values(%s,%s,%s,%s,%s)"
        try:
            self.db.ec(query, (feature_id, beacon_id, feature_type, feature_installDate, feature_uninstallDate))
            return True
        except:
            return False
