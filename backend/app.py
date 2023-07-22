import db.dao as db
from flask import Flask, render_template, send_from_directory, jsonify

app = Flask(__name__, template_folder="../frontend/dist")

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
def get_beacon(beacon_id):
    # 특정 항로표지
    result = {
        'id': None,
        'name': None,
        'coordinate': {
            'lat': None,
            'lng': None,
        },
        'state': None,
        'failure_prob': None,
    }
    aBeacon = db.get_beacon(beacon_id)
    aPredict = db.get_latest_predict(beacon_id)
    result['id'] = aBeacon.id
    result['name'] = aBeacon.name
    result['coordinate']['lat'] = aBeacon.coord.lat
    result['coordinate']['lng'] = aBeacon.coord.lng
    result['state'] = aPredict.get_state()
    result['failure_prob'] = aPredict.score

    return jsonify(result)

@app.route('/beacon/all', methods=['GET'])
def get_all_beacon():
    # all
    return

@app.route('/<path:filename>', methods=['GET'])
def resource(filename):
    print("resource", filename)
    return send_from_directory("../frontend/dist", filename)

@app.route('/assets/<path:filename>', methods=['GET'])
def assets_resource(filename):
    return send_from_directory("../frontend/dist/assets", filename)

@app.route('/dbtest', methods=['GET'])
def dbtest():
    return str(db.get_all_beacons())