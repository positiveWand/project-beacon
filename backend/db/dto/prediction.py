from .data_model import DataModel
import datetime

class Prediction(DataModel):
    dateformat = '%Y-%m-%d %H:%M:%S'
    attr_map = {
        'prediction_id': 'id',
        'prediction_type': 'type',
        'beacon_id': 'beacon',
        'prediction_time': 'time',
        'prediction_content': 'content'
    }

    def __init__(self,
                 id: str,
                 type: str,
                 beacon: str,
                 time: datetime.datetime,
                 content: str):
        self.id = id
        self.type = type
        self.beacon = beacon
        self.time = time
        self.content = content

        self.attr_map = Prediction.attr_map
        self.dateformat = Prediction.dateformat
    
    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
            
        self.id = dictionary['prediction_id']
        self.type = dictionary['prediction_type']
        self.beacon = dictionary['beacon_id']
        self.time = dictionary['prediction_time']
        self.content = dictionary['prediction_content']

        self.attr_map = Prediction.attr_map
        self.dateformat = Prediction.dateformat

    def get_state(self):
        if self.type != 'simple_probability':
            return None
        if int(self.content) < 33:
            return 'low'
        elif int(self.content) < 66:
            return 'medium'
        else:
            return 'high'
