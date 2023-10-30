from flask import request, jsonify, send_file, current_app, make_response
import datetime, io
from db.dto.prediction import Prediction
from db.dao.dao import DAO_Universal


def beacon():
    dao: DAO_Universal = current_app.config.get('DAO')
    # 특정 항로표지 정보 반환
    beacon_id = request.args.get('id')
    aBeacon = dao.select_beacon(beacon_id) # 항로표지 정보
    aPrediction = Prediction() # 항로표지의 최신 예측 정보
    for prediction in dao.select_latest_prediction(beacon_id):
        if prediction.type == 'simple_probability':
            aPrediction = prediction

    return jsonify({
        'id': aBeacon.id,
        'name': aBeacon.name,
        'coordinate': {
            'lat': aBeacon.lat,
            'lng': aBeacon.lng,
        },
        'state': aPrediction.get_state(),
        'failure_prob': aPrediction.content,
    })

def beacon_all():
    dao: DAO_Universal = current_app.config.get('DAO')
    # 항로표지 목록 반환
    result = []
    for aBeacon in dao.select_all_beacons():
        aPrediction = Prediction({}) # 항로표지의 최신 예측 정보
        for prediction in dao.select_prediction_latest(aBeacon.id):
            if prediction.type == 'simple_probability':
                aPrediction = prediction

        obejct = {
            'id': aBeacon.id,
            'name': aBeacon.name,
            'coordinate': {
                'lat': aBeacon.lat,
                'lng': aBeacon.lng,
            },
            'state': aPrediction.get_state(),
            'failure_prob': aPrediction.content,
        }

        result.append(obejct)
    print(result)
    return jsonify(result)


def beacon_image():
    dao: DAO_Universal = current_app.config.get('DAO')
    # 특정 항로표지 이미지 반환
    beacon_id = request.args.get('id')
    print('beacon_image', type(beacon_id))
    aBeacon = dao.select_beacon(beacon_id)

    if aBeacon is not None:
        beacon_image = aBeacon.image
    else:
        return make_response("Not Found", 404)
    return send_file(io.BytesIO(beacon_image), mimetype='image/jpeg')


def beacon_detail():
    dao: DAO_Universal = current_app.config.get('DAO')
    # 특정 항로표지 detail 반환
    beacon_id = request.args.get('id')
    print('beacon_detail', beacon_id)

    aBeacon = dao.select_beacon(beacon_id) # 항로표지 정보
    beacon_dict = aBeacon.to_dict()
    beacon_dict.pop('beacon_image')
    beacon_dict.pop('beacon_embedding')
    features = dao.select_features(beacon_id)
    inspections = dao.select_inspections(beacon_id)

    data ={
        'basicInfo': beacon_dict,
        'featureInfo': {},
        'inspectionInfo': []
    }

    data["featureInfo"]["light"] =[]
    data["featureInfo"]["solarbattery"] =[]
    data["featureInfo"]["batterycharge"] =[]
    data["featureInfo"]["storagebattery"] =[]
    data["featureInfo"]["racon"] = []
    data["featureInfo"]["rtu"] = []
    data["featureInfo"]["ais"] = []
    
    for feature in features:
        if(feature.uninstall_date == None):
            data["featureInfo"][feature.type].insert(0, feature.to_dict())
        else:
            data["featureInfo"][feature.type].append(feature.to_dict())
    for inspection in inspections:
        data["inspectionInfo"].append(inspection.to_dict())
    print(data)
    return jsonify(data)


def beacon_signal():
    dao: DAO_Universal = current_app.config.get('DAO')
    ###### 수정 필요(미완성) ########
    beacon_id = request.args.get('id')
    obejct = {
        'light': None,
        'solarbattery': None,
        'batterycharge': None,
        'storagebattery': None,
        'racon': None,
        'rtu': None,
        'ais': None,
    }
    for aFeature in dao.select_features(beacon_id):
        if(aFeature.uninstall_date == None):
            obejct[aFeature.type] = True
        else:
            obejct[aFeature.type] = False

    return obejct




def beacon_prediction():
    dao: DAO_Universal = current_app.config.get('DAO')
    ###### 수정 필요(미완성) ########
    beacon_id = request.args.get('id')
    dao.select_prediction(beacon_id)
    obejct = {
        'prediction_id' : None
    }
    return jsonify(obejct)


def beacon_prediction_latest():
    dao: DAO_Universal = current_app.config.get('DAO')
    beacon_id = request.args.get('id')
    body = request.get_json()

    if body['type'] is None or len(body['type']) == 0:
        return 'Need Type Specified', 400
    if body['start'] is None:
        return 'Need Start Datetime Specified', 400
    
    result = dict()
    for aPrediction in dao.select_prediction_latest(beacon_id):
        if aPrediction.type in body['type']:
            result[aPrediction.type] = aPrediction.content

    return jsonify(result)


def beacon_prediction_range():
    dao: DAO_Universal = current_app.config.get('DAO')
    datetime_format = '%Y-%m-%dT%H:%M:%S'
    beacon_id = request.args.get('id')
    body = request.get_json()

    if body['type'] is None or len(body['type']) == 0:
        return 'Need Type Specified', 400
    if body['start'] is None:
        return 'Need Start Datetime Specified', 400
    
    start_time = datetime.datetime.strptime(body['start'], datetime_format)
    if body['end'] is not None:
        end_time = datetime.datetime.strptime(body['end'], datetime_format)
    else:
        end_time = None
    
    result = dict()
    for aType in body['type']:
        typeList = []
        for aData in dao.select_prediction(beacon_id, aType, start_time, end_time):
            typeList.append({'time': aData.time, 'content': aData.content})

        result[aType] = typeList

    return jsonify(result)


def beacon_sensor():
    dao: DAO_Universal = current_app.config.get('DAO')
    datetime_format = '%Y-%m-%dT%H:%M:%S'
    beacon_id = request.args.get('id')
    body = request.get_json()

    if body['column'] is None:
        return 'Need Column Specified', 400
    if body['start'] is None:
        return 'Need Start Datetime Specified', 400
    
    start_time = datetime.datetime.strptime(body['start'], datetime_format)
    if body['end'] is not None:
        end_time = datetime.datetime.strptime(body['end'], datetime_format)
    else:
        end_time = None

    result = []
    for aData in dao.select_sensor_data(beacon_id, start_time, end_time, body['column']):
        result.append({'time': aData.regist_time.strftime(datetime_format), 'value': aData.to_dict()[body['column']]})

    return jsonify(result)