import os
import io
from . import dbconnection
from .dto.beacon import Beacon
from .dto.feature import Feature
from .dto.inspection import Inspection
from .dto.beaconFull import BeaconFull
from .dto.coordinate import Coordinate
from .dto.prediction import Prediction
from .dto.embedding import Embedding
from flask import send_file

db = dbconnection.DBConnection("azure-testdb")

def get_all_beacons():
    result = []
    select_all_beacons = 'SELECT * FROM `BEACONS`'

    for aBeacon in db.efa(select_all_beacons):
        result.append(Beacon(aBeacon['beacon_id'], aBeacon['beacon_lat'], aBeacon['beacon_lng'], aBeacon['beacon_name']))

    return result

def get_beacon(beacon_id):
    result = None
    select_beacon = 'SELECT * FROM `BEACONS` WHERE `beacon_id` = %s'

    aBeacon = db.efo(select_beacon, (beacon_id))
    result = Beacon(aBeacon['beacon_id'], aBeacon['beacon_lat'], aBeacon['beacon_lng'], aBeacon['beacon_name'])


def get_beacon_full(beacon_id):
    result = None
    select_beacon = 'SELECT * FROM `BEACONS` WHERE `beacon_id` = %s'

    aBeacon = db.efo(select_beacon, (beacon_id))
    result = BeaconFull(aBeacon['beacon_id'], aBeacon['beacon_lat'], aBeacon['beacon_lng'], aBeacon['beacon_name'] , aBeacon['beacon_type'], aBeacon['beacon_group'], \
                        aBeacon['beacon_purpose'], aBeacon['beacon_office'], aBeacon['beacon_installDate'], aBeacon['beacon_color'] ,\
                            aBeacon['beacon_lightColor'] , aBeacon['beacon_lightCharacteristic'] , aBeacon['beacon_lightSignalPeriod'])

    return result

def get_features(beacon_id):
    result = []
    select_features = 'SELECT * FROM `FEATURES` WHERE `beacon_id` = %s order by `feature_installDate` desc'

    for feature in db.efa(select_features, beacon_id):
        result.append(Feature(feature['feature_id'], feature['beacon_id'], feature['feature_type'], feature['feature_installDate'],\
                              feature['feature_uninstallDate']))
    return result

def get_inspections(beacon_id):
    result = []

    select_inspections = 'SELECT * FROM `inspection_logs` WHERE `beacon_id` = %s order by `inspection_startDate` desc'

    for inspection in db.efa(select_inspections, beacon_id):
        result.append(Inspection(inspection['inspection_id'], inspection['beacon_id'], inspection['inspection_inspector'], inspection['inspection_purpose'],\
                                inspection['inspection_content'],inspection['inspection_note'], inspection['inspection_startDate'], inspection['inspection_endDate']))
    return result


#image

def update_images():
    # 현재 스크립트의 경로
    script_path = os.path.abspath(__file__)

    # 상위 폴더의 경로
    parent_folder_path = os.path.dirname(os.path.dirname(script_path))

    # 상위 폴더의 상위 폴더 내 다른 폴더의 경로
    other_folder_path = os.path.join(parent_folder_path, "images")

    # 폴더 내의 모든 이미지 파일 처리
    for filename in os.listdir(other_folder_path):
        if filename.endswith(".jpg"):  # 혹은 다른 이미지 확장자로 변경
            image_path = os.path.join(other_folder_path, filename)
            with open(image_path, 'rb') as image_file:
                    image_bytes = image_file.read()
            print(image_bytes)
            update_query = "UPDATE `BEACONS` SET `beacon_image` = %s WHERE `beacon_id` = %s"
            db.ec(update_query, (image_bytes, filename.split(".")[0]))
    return True


def get_beacon_image(beacon_id):
    result = None
    select_beacon = 'SELECT `beacon_image` FROM `BEACONS` WHERE `beacon_id` = %s'

    aBeacon_image = db.efo(select_beacon, (beacon_id))
    result = aBeacon_image['beacon_image']

    return send_file(io.BytesIO(result), mimetype='image/jpeg')


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
    select_latest_predict = 'SELECT * FROM `PREDICTION_LOGS` WHERE `beacon_id` = %s ORDER BY `prediction_time` DESC LIMIT 1'

    aPredict = db.efo(select_latest_predict, (beacon_id))
    if aPredict is not None:
        result = Prediction(aPredict['prediction_id'], aPredict['prediction_time'], aPredict['prediction_score'])
    else:
        result = Prediction()

    return result

def get_all_predict(beacon_id):
    result = []
    select_all_predict = 'SELECT * FROM `PREDICTION_LOGS` WHERE `prediction_id` = %s ORDER BY `prediction_time` DESC LIMIT 1'

    for aPredict in db.efa(select_all_predict, (beacon_id)):
        result.append(Prediction(aPredict['prediction_id'], aPredict['prediction_time'], aPredict['prediction_score']))

    return result

def get_all_beacons_with_recent():
    result = []
    #select_all_beacons_with_recent = 'SELECT * FROM `BEACONS` A LEFT OUTER JOIN (SELECT prediction_id, prediction_time, prediction_score, beacon_id FROM `PREDICTION_LOGS` B WHERE `prediction_time` = (SELECT MAX(`prediction_time`) FROM `PREDICTION_LOGS` C WHERE B.prediction_time = C.prediction_time)) D ON A.beacon_id = D.beacon_id'

    select_all_beacons_with_recent =( "SELECT * FROM `BEACONS` A LEFT OUTER JOIN (\
	        SELECT pl1.beacon_id, pl1.prediction_id ,pl1.prediction_time, pl1.prediction_score\
	        FROM prediction_logs pl1\
	        INNER JOIN (\
		        SELECT beacon_id, MAX(prediction_time) AS max_time\
		        FROM prediction_logs\
		        GROUP BY beacon_id\
	        ) pl2 ON pl1.beacon_id = pl2.beacon_id AND pl1.prediction_time = pl2.max_time\
        ) B on A.beacon_id = B.beacon_id;")

    for aTuple in db.efa(select_all_beacons_with_recent):
        print(aTuple)
        aPrediction = Prediction(aTuple['prediction_id'], aTuple['prediction_time'], aTuple['prediction_score'])
        result.append(Beacon(aTuple['beacon_id'], aTuple['beacon_lat'], aTuple['beacon_lng'], aTuple['beacon_name'], aPrediction.get_state(), aPrediction.score))

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
def check_favorite_beacon(user_id,beacon_id) : 
    check_favorite = 'SELECT * FROM `favorites` WHERE `user_id` = %s and `beacon_id` = %s'
    favorite = db.efo(check_favorite,(user_id,beacon_id))
    if favorite is not None :
        return True     # is favorite
    else :     
        return False    # is not favorite 
 

def add_beacon(beacon):
    add = 'INSERT INTO `BEACONS` (beacon_id, beacon_name, beacon_type, beacon_lat, beacon_lng,\
        beacon_group, beacon_purpose, beacon_office, beacon_installDate, beacon_color,\
            beacon_lightColor, beacon_lightCharacteristic, beacon_lightSignalPeriod)\
                values(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)' 
    print(beacon.beacon_id)
    db.ec(add, (beacon.beacon_id, beacon.beacon_name, beacon.beacon_type, beacon.beacon_lat,
            beacon.beacon_lng, beacon.beacon_group, beacon.beacon_purpose, beacon.beacon_office,
            beacon.beacon_installDate, beacon.beacon_color, beacon.beacon_lightColor,
            beacon.beacon_lightCharacteristic, beacon.beacon_lightSignalPeriod))
    
    return True


def add_inspection(inspection):
    add = "INSERT INTO `inspection_logs` (inspection_id, beacon_id, inspection_inspector, inspection_purpose,\
          inspection_content, inspection_note, inspection_startDate, inspection_endDate)\
            values(%s,%s,%s,%s,%s,%s,%s,%s)"
    db.ec(add, (inspection["inspection_id"],inspection["beacon_id"],inspection["inspection_inspector"],
                inspection["inspection_purpose"],inspection["inspection_content"],inspection["inspection_note"],\
                    inspection["inspection_startDate"],inspection["inspection_endDate"],))
    return True
