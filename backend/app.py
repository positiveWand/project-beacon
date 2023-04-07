from db import dbconnection
from flask import Flask, render_template, send_from_directory
from GDN_SMART3 import main

app = Flask(__name__, template_folder="../frontend/dist")

@app.route("/", methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/<path:filename>', methods=['GET'])
def resource(filename):
    return send_from_directory("../frontend/dist", filename)

@app.route('/assets/<path:filename>', methods=['GET'])
def assets_resource(filename):
    return send_from_directory("../frontend/dist/assets", filename)

@app.route('/dbtest', methods=['GET'])
def dbtest():
    dao = dbconnection.DBConnection("azure-testdb")
    return str(dao.efp("SELECT * FROM user"))

@app.route('/modeltest', methods=['GET'])
def dbtest():
    aRunner = main.Run()
    aRunner.run()
    return "성공!"