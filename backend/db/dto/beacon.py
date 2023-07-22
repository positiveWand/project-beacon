from dataobject import DataObject
from coordinate import Coordinate

class Beacon(DataObject):
    def __init__(self, id = None, lat = None, lng = None, name = 'noname'):
        # super().__init__()
        self.id = id
        self.coord = Coordinate(lat, lng)
        self.name = name