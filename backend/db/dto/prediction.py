from .dataobject import DataObject

class Prediction(DataObject):
    def __init__(self, id = None, type = None, time = None, content = None) -> None:
        self.id = id
        self.type = type
        self.time = time
        self.content = content

    def get_state(self):
        if self.type != 'simple_probability':
            return None
        if int(self.content) < 33:
            return 'low'
        elif int(self.content) < 66:
            return 'medium'
        else:
            return 'high'