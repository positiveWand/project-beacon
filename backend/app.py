from db.dbconnection import DBConnection
from db.dao.dao import DAO_Universal

from batch.tasks import test_job, init_batch
from flask import Flask
from flask_cors import CORS
from flask_apscheduler import APScheduler
from datetime import timedelta

from resource_api import *
from user_api import *
from data_select_api import *
from data_insert_api import *
from data_update_api import *

def create_app():
    app = Flask(__name__, template_folder="../frontend/dist")
    app.secret_key = "Beaconzzang!"
    app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=10) # login time 10 minute
    app.config["SCEDULER_API_ENABLED"] = True

    # CORS 허용
    CORS(app, supports_credentials=True, origins=["http://localhost:5173"])

    # 스케줄러 시작하기
    # scheduler = APScheduler()
    # init_batch()
    # scheduler.api_enabled = True
    # scheduler.init_app(app)
    # scheduler.start()
    # scheduler.add_job(id='test_job', func=test_job, trigger='interval', seconds=5)

    db = DBConnection("azure-cnudb")
    dao = DAO_Universal(conn = db)

    app.config["DAO"] = dao

    app.add_url_rule('/', view_func=index, methods=['GET'])
    app.add_url_rule('/main', view_func=page_main, methods=['GET'])
    app.add_url_rule('/login', view_func=page_login, methods=['GET'])
    app.add_url_rule('/signup', view_func=page_signup, methods=['GET'])
    app.add_url_rule('/search', view_func=page_search, methods=['GET'])
    app.add_url_rule('/detail', view_func=page_detail, methods=['GET'])
    app.add_url_rule('/upload/insert', view_func=page_upload_insert, methods=['GET'])
    app.add_url_rule('/upload/update', view_func=page_upload_update, methods=['GET'])
    app.add_url_rule('/<path:filename>', view_func=resource_from_dist, methods=['GET'])
    app.add_url_rule('/assets/<path:filename>', view_func=resource_from_assets, methods=['GET'])

    app.add_url_rule('/signup/request', view_func=signup_request, methods=['POST'])
    app.add_url_rule('/login/request', view_func=login_request, methods=['POST'])
    app.add_url_rule('/login/check', view_func=login_check, methods=['GET', 'POST'])
    app.add_url_rule('/logout/request', view_func=logout_request, methods=['GET'])

    app.add_url_rule('/beacon/favorites', view_func=favorite_check, methods=['GET'])
    app.add_url_rule('/beacon/favorites/all', view_func=favorite_all, methods=['GET'])
    app.add_url_rule('/beacon/favorites', view_func=favorite_insert, methods=['POST'])
    app.add_url_rule('/beacon/favorites', view_func=favorite_delete, methods=['DELETE'])

    app.add_url_rule('/beacon', view_func=beacon, methods=['GET'])
    app.add_url_rule('/beacon/all', view_func=beacon_all, methods=['GET'])
    app.add_url_rule('/beacon/image', view_func=beacon_image, methods=['GET'])
    app.add_url_rule('/beacon/detailInfo', view_func=beacon_detail, methods=['GET'])
    app.add_url_rule('/beacon/signalInfo', view_func=beacon_signal, methods=['GET'])
    app.add_url_rule('/beacon/predictionInfo', view_func=beacon_prediction, methods=['GET'])
    app.add_url_rule('/beacon/predictionInfo/latest', view_func=beacon_prediction_latest, methods=['GET'])
    app.add_url_rule('/beacon/predictionInfo/range', view_func=beacon_prediction_range, methods=['GET'])
    app.add_url_rule('/beacon/sensor', view_func=beacon_sensor, methods=['GET'])

    app.add_url_rule('/beacon/new', view_func=beacon_insert, methods=['POST'])
    app.add_url_rule('/feature/new', view_func=feature_insert, methods=['POST'])
    app.add_url_rule('/inspection/new', view_func=inspection_insert, methods=['POST'])

    app.add_url_rule('/beacon/updateImage', view_func=beacon_image_update, methods=['POST'])
    app.add_url_rule('/beacon/updateEmbedding', view_func=beacon_embedding_update, methods=['POST'])

    return app

if __name__ == "__main__":
    myApp = create_app()
    myApp.run()