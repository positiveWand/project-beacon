from .dataobject import DataObject

class Prediction(DataObject):
    def __init__(self, id = None, time = None, content = None) -> None:
        self.id = id
        self.time = time
        self.content = content

    def get_state(self):
        if type(self.content) is not int:
            return None
        if self.content < 33:
            return 'low'
        elif self.content < 66:
            return 'medium'
        else:
            return 'high'