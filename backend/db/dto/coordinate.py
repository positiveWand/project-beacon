from .dataobject import DataObject

class Coordinate(DataObject):
    def __init__(self, lat = None, lng = None) -> None:
        self.lat = lat
        self.lng = lng