from .dataobject import DataObject

class Prediction(DataObject):
    def __init__(self, id, time, score) -> None:
        self.id = id
        self.time = time
        self.score = score

    def get_state(self):
        if type(self.score) is not int:
            return None
        if self.score < 33:
            return 'low'
        elif self.score < 66:
            return 'medium'
        else:
            return 'high'