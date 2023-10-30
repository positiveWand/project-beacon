from .data_model import DataModel

class Favorite(DataModel):
    attr_map = {
        'user_id': 'user',
        'beacon_id': 'beacon',
    }

    def __init__(self, 
                 user: str, 
                 beacon: str):
        self.user = user
        self.beacon = beacon

        self.attr_map = Favorite.attr_map
    
    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.user = dictionary['user_id']
        self.beacon = dictionary['beacon_id']

        self.attr_map = Favorite.attr_map