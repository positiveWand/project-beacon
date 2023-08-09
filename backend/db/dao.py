from . import dbconnection
from .dto.beacon import Beacon
from .dto.coordinate import Coordinate
from .dto.prediction import Prediction
from .dto.embedding import Embedding

db = dbconnection.DBConnection("azure-testdb")

def get_all_beacons():
    result = []
    select_all_beacons = 'SELECT * FROM `BEACON`'

    for aBeacon in db.efa(select_all_beacons):
        result.append(Beacon(aBeacon['id'], aBeacon['lat'], aBeacon['lng'], aBeacon['name']))

    return result

def get_beacon(beacon_id):
    result = None
    select_beacon = 'SELECT * FROM `BEACON` WHERE `id` = %s'

    aBeacon = db.efo(select_beacon, (beacon_id))
    result = Beacon(aBeacon['id'], aBeacon['lat'], aBeacon['lng'], aBeacon['name'])

    return result
### user
def get_all_users_id(): 
    result = []
    select_all_beacon_user_id = 'SELECT * FROM `Beacon_user`'

    for user in db.efa(select_all_beacon_user_id):
        result.append(user['user_id'])
    return result
def check_user(user_id,user_password): 
    select_user = 'SELECT * FROM `Beacon_user` WHERE `user_id` = %s and `user_password` = %s'
    s_user = db.efo(select_user,(user_id,user_password))
    if  s_user is not None :
        return True  
    else :
        return False  
def add_user(user):
    add = 'INSERT INTO `Beacon_user` (user_id,user_password,user_email) values(%s,%s,%s)' 
    db.ec(add, (user['id'], user['password'], user['email']))
    return True
### user 


def get_latest_predict(beacon_id):
    result = None
    select_latest_predict = 'SELECT * FROM `PREDICT_LOG` WHERE `id` = %s ORDER BY `time` DESC LIMIT 1'

    aPredict = db.efo(select_latest_predict, (beacon_id))
    if aPredict is not None:
        result = Prediction(aPredict['id'], aPredict['time'], aPredict['score'])
    else:
        result = Prediction()

    return result

def get_all_predict(beacon_id):
    result = []
    select_all_predict = 'SELECT * FROM `PREDICT_LOG` WHERE `id` = %s ORDER BY `time` DESC LIMIT 1'

    for aPredict in db.efa(select_all_predict, (beacon_id)):
        result.append(Prediction(aPredict['id'], aPredict['time'], aPredict['score']))

    return result

def get_all_beacons_with_recent():
    result = []
    select_all_beacons_with_recent = 'SELECT * FROM `BEACON` A LEFT OUTER JOIN (SELECT id, time, score FROM `PREDICT_LOG` B WHERE `time` = (SELECT MAX(`time`) FROM `PREDICT_LOG` C WHERE B.time = C.time)) D ON A.id = D.id'

    for aTuple in db.efa(select_all_beacons_with_recent):
        print(aTuple)
        aPrediction = Prediction(aTuple['id'], aTuple['time'], aTuple['score'])
        result.append(Beacon(aTuple['id'], aTuple['lat'], aTuple['lng'], aTuple['name'], aPrediction.get_state(), aPrediction.score))

    return result

def get_all_favorite_beacons(user_id):
    result = []
    print(user_id)
    select_all_favorite_beacons = 'SELECT `beacon_id` FROM `favorites` WHERE `user_id` = %s' 

    for afavorite in db.efa(select_all_favorite_beacons,(user_id)):
        result.append(afavorite['beacon_id'])
    return result
def add_favorite_beacon(user_id,beacon_id):
    add = 'INSERT INTO `favorites` (user_id,beacon_id) values(%s,%s)' 
    db.ec(add, (user_id, beacon_id))
    return True
def delete_favorite_beacon(user_id,beacon_id) : 
    delete = 'DELETE FROM `favorites` WHERE `user_id`= %s and `beacon_id` = %s'
    db.ec(delete,(user_id,beacon_id))
    return True