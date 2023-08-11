from .dataobject import DataObject

class Inspection(DataObject):
    def __init__(self, inspection_id = None, beacon_id = None, inspection_inspector = None, inspection_purpose = None, inspection_content = None,\
                 inspection_note = None, inspection_startDate = None, inspection_endDate = None):
        # super().__init__()
        self.inspection_id = inspection_id
        self.beacon_id = beacon_id
        self.inspection_inspector = inspection_inspector
        self.inspection_purpose = inspection_purpose
        self.inspection_note = inspection_note
        self.inspection_startDate = inspection_startDate
        self.inspection_endDate = inspection_endDate

    def pyData(self):
        return{
            "inspection_id": self.inspection_id,
            "beacon_id": self.beacon_id,
            "inspection_inspector": self.inspection_inspector,
            "inspection_purpose": self.inspection_purpose,
            "inspection_note": self.inspection_note,
            "inspection_startDate": self.inspection_startDate,
            "inspection_endDate": self.inspection_endDate
        }