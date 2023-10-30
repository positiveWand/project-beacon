from .data_model import DataModel
import datetime

class Beacon(DataModel):
    dateformat = '%Y-%m-%d'
    attr_map = {
        'beacon_id': 'id',
        'beacon_name': 'name',
        'beacon_type': 'type',
        'beacon_lat': 'lat',
        'beacon_lng': 'lng',
        'beacon_group': 'group',
        'beacon_purpose': 'purpose',
        'beacon_office': 'office',
        'beacon_installDate': 'install_date',
        'beacon_color': 'color',
        'beacon_lightColor': 'light_color',
        'beacon_lightCharacteristic': 'light_characteristic',
        'beacon_lightSignalPeriod': 'light_period',
        'beacon_image': 'image',
        'beacon_embedding': 'embedding'
    }

    def __init__(self,
               id: str, name: str, type: str,
               lat: float, lng: float,
               group: str, 
               purpose: str, 
               office: str, 
               install_date: datetime.datetime, 
               color: str, 
               light_color: str, light_characteristic: str, light_period: str, 
               image: bytes, 
               embedding: bytes):
        self.id = id
        self.name = name
        self.type = type
        self.lat = lat
        self.lng = lng
        self.group = group
        self.purpose = purpose
        self.office = office
        self.install_date = install_date
        self.color = color
        self.light_color = light_color
        self.light_characteristic = light_characteristic
        self.light_period = light_period
        self.image = image
        self.embedding = embedding

        self.attr_map = Beacon.attr_map
        self.dateformat = Beacon.dateformat

    def __init__(self, dictionary: dict):
        for aKey in self.attr_map.keys():
            dictionary.setdefault(aKey, None)
        self.id = dictionary['beacon_id']
        self.name = dictionary['beacon_name']
        self.type = dictionary['beacon_type']
        self.lat = dictionary['beacon_lat']
        self.lng = dictionary['beacon_lng']
        self.group = dictionary['beacon_group']
        self.purpose = dictionary['beacon_purpose']
        self.office = dictionary['beacon_office']
        self.install_date = dictionary['beacon_installDate']
        self.color = dictionary['beacon_color']
        self.light_color = dictionary['beacon_lightColor']
        self.light_characteristic = dictionary['beacon_lightCharacteristic']
        self.light_period = dictionary['beacon_lightSignalPeriod']
        self.image = dictionary['beacon_image']
        self.embedding = dictionary['beacon_embedding']

        self.attr_map = Beacon.attr_map
        self.dateformat = Beacon.dateformat