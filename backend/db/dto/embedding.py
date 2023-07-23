from .dataobject import DataObject

class Embedding(DataObject):
    def __init__(self, id = None, representation = None) -> None:
        self.id = id
        self.representation = representation