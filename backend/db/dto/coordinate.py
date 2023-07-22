from dataobject import DataObject

class Coordinate(DataObject):
    def __init__(self, lat, lng) -> None:
        self.lat = lat
        self.lng = lng