from .data_model import DataModel
import datetime

class Inspection(DataModel):
    dateformat = '%Y-%m-%d'
    attr_map = {
        'inspection_id': 'id',
        'beacon_id': 'beacon',
        'inspection_inspector': 'inspector',
        'inspection_purpose': 'purpose',
        'inspection_content': 'content',
        'inspection_note': 'note',
        'inspection_startDate': 'start_date',
        'inspection_endDate': 'end_date'
    }

    def __init__(self,
                 id: str,
                 beacon: str,
                 inspector: str,
                 purpose: str,
                 content: str,
                 note: str,
                 start_date: datetime.datetime,
                 end_date: datetime.datetime):
        self.id = id
        self.beacon = beacon
        self.inspector = inspector
        self.purpose = purpose
        self.content = content
        self.note = note
        self.start_date = start_date
        self.end_date = end_date

        self.attr_map = Inspection.attr_map
        self.dateformat = Inspection.dateformat
    
    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.id = dictionary['inspection_id']
        self.beacon = dictionary['beacon_id']
        self.inspector = dictionary['inspection_inspector']
        self.purpose = dictionary['inspection_purpose']
        self.content = dictionary['inspection_content']
        self.note = dictionary['inspection_note']
        self.start_date = dictionary['inspection_startDate']
        self.end_date = dictionary['inspection_endDate']

        self.attr_map = Inspection.attr_map
        self.dateformat = Inspection.dateformat