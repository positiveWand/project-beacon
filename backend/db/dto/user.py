from .dataobject import DataObject
from .coordinate import Coordinate

class User(DataObject):
    def __init__(self, id = None, email = None, password = None):
        # super().__init__()
        self.id = id
        self.email = email
        self.password = password