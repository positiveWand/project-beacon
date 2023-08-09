from db.dao import *
from batch.command import print_message
from flask import Flask, render_template, send_from_directory, jsonify,request,session,redirect,app,url_for
from datetime import timedelta
from markupsafe import escape
app = Flask(__name__, template_folder="../frontend/dist")
app.secret_key = "Beaconzzang!"
app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=10) # login time 10 minute


@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')
@app.route('/main', methods=['GET'])
def mainPage():
    return render_template('/src/mainPage/index.html')
@app.route('/login', methods=['GET'])
def loginPage():
    return render_template('/src/loginPage/index.html')
@app.route('/signup', methods=['GET'])
def signupPage():
    return render_template('/src/signupPage/index.html')
@app.route('/search', methods=['GET'])
def searchPage():
    return render_template('/src/searchPage/index.html')
@app.route('/detail', methods=['GET'])
def detailPage():
    return render_template('/src/detailPage/index.html')

@app.route('/beacon/<int:beacon_id>', methods=['GET'])
def beacon(beacon_id):
    # 특정 항로표지
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

@app.route('/beacon/all', methods=['GET'])
def all_beacon():
    # all
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

@app.route('/<path:filename>', methods=['GET'])
def resource(filename):
    print("resource", filename)
    return send_from_directory("../frontend/dist", filename)

@app.route('/assets/<path:filename>', methods=['GET'])
def assets_resource(filename):
    return send_from_directory("../frontend/dist/assets", filename)

@app.route('/dbtest', methods=['GET'])
def dbtest():
    return str(get_all_beacons())

@app.route('/command/<string:name>', methods=['GET'])
def command(name):
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
    
@app.route('/signup/post',methods= ['POST'])
def signupRequest():
    params = request.get_json()
    if params['id'] in get_all_users_id() :
        print(get_all_users_id())
        return "false"
    else :
        add_user(params)
        return "True" 
@app.route('/login/post',methods=['POST'])
def loginRequest():
    resObject = {}
    resObject['id'] = None
    resObject['result'] = 'false'
    params = request.get_json()
    if params['id'] in get_all_users_id() :
        if check_user(params['id'],params['password']) == True:
           session['id'] =   resObject['id']
           resObject['id'] = params['id']
           resObject['result'] = 'true'
    return jsonify(resObject)
@app.route('/login/check',methods=['GET','POST'])
def loginCheck():
    if 'id' in session :
        return "true"

    return "false"  
@app.route('/logout/get',methods = ['GET'])
def logout():
    session.pop('id',None)
    return "true"
