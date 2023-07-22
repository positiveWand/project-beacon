from dataobject import DataObject

class Embedding(DataObject):
    def __init__(self, id, representation) -> None:
        self.id = id
        self.representation = representation