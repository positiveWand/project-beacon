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

def get_latest_predict(beacon_id):
    result = None
    select_latest_predict = 'SELECT * FROM `PREDICT_LOG` WHERE `id` = %s ORDER BY `time` DESC LIMIT 1'

    aPredict = db.efo(select_latest_predict, (beacon_id))
    result = Prediction(aPredict['id'], aPredict['time'], aPredict['score'])

    return result

def get_all_predict(beacon_id):
    result = []
    select_all_predict = 'SELECT * FROM `PREDICT_LOG` WHERE `id` = %s ORDER BY `time` DESC LIMIT 1'

    for aPredict in db.efa(select_all_predict, (beacon_id)):
        result.append(Prediction(aPredict['id'], aPredict['time'], aPredict['score']))

    return result

def get_all_beacons_with_recent():
    result = []
    select_all_beacons_with_recent = 'SELECT * FROM `BEACON` A LEFT OUTER JOIN (SELECT id, time, score FROM `PREDICT_LOG` WHERE `time` = (SELECT MAX(`time`) FROM `PREDICT_LOG`)) B ON A.id = B.id'

    for aTuple in db.efa(select_all_beacons_with_recent):
        print(aTuple)
        aPrediction = Prediction(aTuple['id'], aTuple['time'], aTuple['score'])
        result.append(Beacon(aTuple['id'], aTuple['lat'], aTuple['lng'], aTuple['name'], aPrediction.get_state(), aPrediction.score))

    return result