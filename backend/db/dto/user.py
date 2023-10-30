from .data_model import DataModel

class User(DataModel):
    attr_map = {
        'user_id': 'id',
        'user_password': 'password',
        'user_email': 'email',
        'user_name': 'name'
    }

    def __init__(self, 
                 id: str, 
                 password: str, 
                 email: str, 
                 name: str):
        self.id = id
        self.password = password
        self.email = email
        self.name = name

        self.attr_map = User.attr_map
    
    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.id = dictionary['user_id']
        self.password = dictionary['user_password']
        self.email = dictionary['user_email']
        self.name = dictionary['user_name']

        self.attr_map = User.attr_map