from .beacon import DAO_Beacon
from .user import DAO_User
from .inspection import DAO_Inspection
from .feature import DAO_Feature
from .favorites import DAO_Favorites
from .monitor_data import DAO_MonitorData
from .prediction import DAO_Prediction
from .sensor_data import DAO_SensorData
from .beacon import *
from .favorites import  *
from .feature import *
from .inspection import *
from .monitor_data import *
from .prediction import *
from .sensor_data import *
from .user import *
from ..dbconnection import DBConnection

class DAO_Universal(DAO_Beacon, DAO_Inspection, DAO_Feature, DAO_User, DAO_Favorites, DAO_MonitorData, DAO_Prediction, DAO_SensorData):
    def __init__(self, conn: DBConnection):
        self.db = conn