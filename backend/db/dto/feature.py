from .dataobject import DataObject

class Feature(DataObject):
    def __init__(self, feature_id = None, beacon_id = None, feature_type = None, feature_installDate = None, feature_uninstallDate = None):
        # super().__init__()
        self.feature_id = feature_id
        self.beacon_id = beacon_id
        self.feature_type = feature_type
        self.feature_installDate = feature_installDate
        self.feature_uninstallDate = feature_uninstallDate

    def pyData(self):
        return{
            "feature_id": self.feature_id,
            "beacon_id": self.beacon_id,
            "feature_type": self.feature_type,
            "feature_installDate": self.feature_installDate.strftime("%Y-%m-%d") if self.feature_installDate != None else None,
            "featureUninstallDate": self.feature_uninstallDate.strftime("%Y-%m-%d") if self.feature_uninstallDate != None else None
        }