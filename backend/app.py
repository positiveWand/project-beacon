from db import dbconnection
from flask import Flask, render_template, send_from_directory

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

@app.route('/<path:filename>', methods=['GET'])
def resource(filename):
    print("resource", filename)
    return send_from_directory("../frontend/dist", filename)

@app.route('/assets/<path:filename>', methods=['GET'])
def assets_resource(filename):
    return send_from_directory("../frontend/dist/assets", filename)

@app.route('/dbtest', methods=['GET'])
def dbtest():
    dao = dbconnection.DBConnection("azure-testdb")
    return str(dao.efp("SELECT * FROM user"))