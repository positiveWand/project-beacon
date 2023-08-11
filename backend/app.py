from db.dao import *
from batch.command import print_message
from flask import Flask, render_template, send_from_directory, jsonify,request,session,redirect,app,url_for
from datetime import timedelta
from markupsafe import escape
import json
app = Flask(__name__, template_folder="../frontend/dist")
app.secret_key = "Beaconzzang!"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=10) # login time 10 minute


# 페이지 라우팅 알고리즘
@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')
@app.route('/main', methods=['GET'])
def mainPage():
    # 메인페이지 라우팅
    return render_template('/route/main/index.html')
@app.route('/login', methods=['GET'])
def loginPage():
    # 로그인페이지 라우팅
    return render_template('/route/login/index.html')
@app.route('/signup', methods=['GET'])
def signupPage():
    # 회원가입페이지 라우팅
    return render_template('/route/signup/index.html')
@app.route('/search', methods=['GET'])
def searchPage():
    # 탐색페이지 라우팅
    return render_template('/route/search/index.html')
@app.route('/detail', methods=['GET'])
def detailPage():
    # 상세페이지 라우팅
    return render_template('/route/detail/index.html')
@app.route('/<path:filename>', methods=['GET'])
def resource(filename):
    print("resource", filename)
    return send_from_directory("../frontend/dist", filename)
@app.route('/assets/<path:filename>', methods=['GET'])
def assets_resource(filename):
    return send_from_directory("../frontend/dist/assets", filename)

@app.route('/beacon/<string:beacon_id>', methods=['GET'])
def beacon(beacon_id):
    # 특정 항로표지 정보 반환
    aBeacon = get_beacon(beacon_id)
    aPredict = get_latest_predict(beacon_id)

    return jsonify({
        'id': aBeacon.id,
        'name': aBeacon.name,
        'coordinate': {
            'lat': aBeacon.coord.lat,
            'lng': aBeacon.coord.lng,
        },
        'state': aPredict.get_state(),
        'failure_prob': aPredict.score,
    })

@app.route('/beacon/detailInfo', methods=['GET'])
def beacon_detailInfo():
    # 특정 항로표지 detail 반환
    beacon_id = request.args.get('id')

    aBeacon = get_beacon_full(beacon_id)
    features = get_features(beacon_id)
    inspections = get_inspections(beacon_id)
    #aPredict = get_latest_predict(beacon_id)

    data ={}

    data["basicInfo"] = aBeacon.pyData()
    data["featureInfo"] = {}
    data["inspectionInfo"] = []

    data["featureInfo"]["beacon"] =[]
    data["featureInfo"]["rtu"] =[]
    data["featureInfo"]["landmark"] =[]
    data["featureInfo"]["solarbattery"] =[]
    data["featureInfo"]["storagebattery"] = []
    
    for feature in features:
        if(feature.feature_uninstallDate == None):
            data["featureInfo"][feature.feature_type].insert(0, feature.pyData())
        else:
            data["featureInfo"][feature.feature_type].append(feature.pyData())
    for inspection in inspections:
        data["inspectionInfo"].append(inspection.pyData())
    json_str = json.dumps(data, ensure_ascii=False, indent=4, default=str)

    return json_str




@app.route('/beacon/all', methods=['GET'])
def all_beacon():
    # 항로표지 목록 반환
    beacon_list = []
    for aBeacon in get_all_beacons_with_recent():
        obejct = {
            'id': None,
            'name': None,
            'coordinate': {
                'lat': None,
                'lng': None,
            },
            'state': None,
            'failure_prob': None,
        }
        obejct['id'] = aBeacon.id
        obejct['name'] = aBeacon.name
        obejct['coordinate']['lat'] = aBeacon.coord.lat
        obejct['coordinate']['lng'] = aBeacon.coord.lng
        obejct['state'] = aBeacon.state
        obejct['failure_prob'] = aBeacon.recent_prob
        beacon_list.append(obejct)
    print(beacon_list)
    return jsonify(beacon_list)

@app.route('/dbtest', methods=['GET'])
def dbtest():
    return str(get_all_beacons())

@app.route('/command/<string:name>', methods=['GET'])
def command(name):
    # 배치프로그램용
    result = False
    if name == 'pm':
        result = print_message()
    elif name == 'something':
        pass
    else:
        pass

    if result:
        return "명령 처리 성공"
    else:
        return "명령 처리 실패"
    
@app.route('/signup/post',methods= ['POST']) #signup / if id exist return false else add user and return true 
def signupRequest(): 
    params = request.get_json()
    if params['id'] in get_all_users_id() :
        print(get_all_users_id())
        return "false"
    else :
        add_user(params)
        return "true" 
@app.route('/login/post',methods=['POST']) #login //if id exist session login
def loginRequest():
    resObject = {}
    resObject['id'] = None
    resObject['result'] = 'false'
    params = request.get_json()
    if params['id'] in get_all_users_id() :
        if check_user(params['id'],params['password']) == True:
           resObject['id'] = params['id']
           session['id'] =   resObject['id']
           resObject['result'] = 'true'
    print(session['id'],resObject)
    return jsonify(resObject)
@app.route('/login/check',methods=['GET','POST']) #login check
def loginCheck() :
    if 'id' in session :
        return "true"
    return "false"  
@app.route('/logout/get',methods = ['GET']) #logout
def logout() :
    session.pop('id',None)
    return "true"
@app.route('/beacon/favorites',methods= ['GET']) # favorite 
def favorite_list() :
    if 'id' in session : 
        return get_all_favorite_beacons(session['id'])
    return None
@app.route('/beacon/favorites',methods=['POST'])
def add_favorite():
    resObject = {}
    resObject['beacon_id'] = None
    params = request.get_json()
    if 'id' in session : 
        resObject['beacon_id'] = params['beacon_id']
        add_favorite_beacon(session['id'],resObject['beacon_id'])
        return 'true'
    else :
        return "false"
@app.route('/beacon/favorites',methods=['DELETE'])
def delete_favorite():
    params = request.get_json()
    if 'id' in session :
        delete_favorite_beacon(session['id'],params['beacon_id'])
        return 'true'
    else : 
        return 'false'

