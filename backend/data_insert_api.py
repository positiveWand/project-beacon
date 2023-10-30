from flask import request, current_app
import json
import datetime
from db.dao.dao import DAO_Universal

def beacon_insert():
    dao: DAO_Universal = current_app.config.get('DAO')
    beacon_file = request.files['data']
    image_file = request.files['image']
    embedding_file = request.files['embedding']
    beacon_data = None
    image_data = None
    embedding_data = None
    
    if beacon_file.filename == '':
        return 'Need Beacon Data File!!'
    else:
        beacon_data = json.loads(beacon_file.stream.read())

    if image_file.filename != '':
        image_data = image_file.stream.read()
    if embedding_file.filename != '':
        embedding_data = embedding_file.stream.read()

    geo = beacon_data["geometry"]
    geoN , geoE = map(str, geo.split(","))
    geoNClock = list(map(float, geoN.split()[1].split("-")))
    geoNTen = round(geoNClock[0]+geoNClock[1]/60+geoNClock[2]/3600, 7)
    geoEClock = list(map(float, geoE.split()[1].split("-")))
    geoETen = round(geoEClock[0]+geoEClock[1]/60+geoEClock[2]/3600, 7)
    information = json.loads(beacon_data["information"])

    if dao.insert_beacon(
        beacon_data['markCode'], beacon_data['markName'], beacon_data['markType'],
        geoNTen, geoETen,
        beacon_data["markGroupCode"], beacon_data["purposeCode"], beacon_data["officeCode"], beacon_data["installDate"],
        information["colour"], information["lightcolour"],
        information["lightCharacteristic"], information["signalPeriod"],
        image_data, embedding_data
    ):
        return 'true'
    
    return 'false'

def feature_insert():
    dao: DAO_Universal = current_app.config.get('DAO')
    dateformat = '%Y-%m-%d'
    if request.content_type.startswith('multipart/form-data'):
        json_file = request.files['features']
        json_data = json.loads(json_file.stream.read())

        for target_type in json_data:
            for aFeature in json_data[target_type]:
                installDate = datetime.datetime.strptime(aFeature['installDate'], dateformat)
                uninstallDate = None
                if aFeature['uninstallDate'] != "":
                    uninstallDate = datetime.datetime.strptime(aFeature['uninstallDate'], dateformat)
                dao.insert_feature(
                    aFeature['feature_id'], aFeature['beacon_id'], aFeature['type'],
                    installDate, uninstallDate
                )
    elif request.content_type.startswith('application/x-www-form-urlencoded'):
        installDate = datetime.datetime.strptime(aFeature['installDate'], dateformat)
        uninstallDate = None
        if aFeature['uninstallDate'] != "":
            uninstallDate = datetime.datetime.strptime(aFeature['uninstallDate'], dateformat)
        dao.insert_feature(
            request.form['feature_id'], request.form['beacon_id'], request.form['type'],
            installDate, uninstallDate
        )
    else:
        return 'false'
    
    return 'true'

def inspection_insert():
    dao: DAO_Universal = current_app.config.get('DAO')
    dateformat = '%Y-%m-%d'
    if request.content_type.startswith('multipart/form-data'):
        json_file = request.files['inspections']
        json_data = json.loads(json_file.stream.read())

        for aInspection in json_data:
            startDate = datetime.datetime.strptime(aInspection['startDate'], dateformat)
            endDate = datetime.datetime.strptime(aInspection['endDate'], dateformat)
            dao.insert_inspection(
                aInspection['inspection_id'], aInspection['beacon_id'], aInspection['inspector'], aInspection['purpose'],
                aInspection['content'], aInspection['note'], startDate, endDate
            )
    elif request.content_type.startswith('application/x-www-form-urlencoded'):
        startDate = datetime.datetime.strptime(request.form['startDate'], dateformat)
        endDate = datetime.datetime.strptime(request.form['endDate'], dateformat)
        dao.insert_feature(request.form['feature_id'], request.form['beacon_id'], request.form['type'],
                           startDate, endDate)
    else:
        return 'false'
    
    return 'true'