from .data_model import DataModel
import datetime

class Feature(DataModel):
    dateformat = '%Y-%m-%d'
    attr_map = {
        'feature_id': 'id',
        'beacon_id': 'beacon',
        'feature_type': 'type',
        'feature_installDate': 'install_date',
        'feature_uninstallDate': 'uninstall_date'
    }

    def __init__(self,
                 id: str, 
                 beacon: str, 
                 type: str, 
                 install_date: datetime.datetime, 
                 uninstall_date: datetime.datetime):
        self.id = id
        self.beacon = beacon
        self.type = type
        self.install_date = install_date
        self.uninstall_date = uninstall_date

        self.attr_map = Feature.attr_map
        self.dateformat = Feature.dateformat
    
    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.id = dictionary['feature_id']
        self.beacon = dictionary['beacon_id']
        self.type = dictionary['feature_type']
        self.install_date = dictionary['feature_installDate']
        self.uninstall_date = dictionary['feature_uninstallDate']

        self.attr_map = Feature.attr_map
        self.dateformat = Feature.dateformat