# STEP 1
import pymysql
import os

class DBConnection():
    def __init__(self, target="local"):
        # [주의] ssl_ca 경로 상 한국어 있으면 안됨
        conn = None

        if target == "local":
            host = "localhost"
            user = "test"
            password = 'testpassword'
            database = 'testdb'

            conn = pymysql.connect(host=host, user=user, password=password, database=database, charset='utf8')
        elif target == "azure-testdb":
            host = "projectbeacon-db.mysql.database.azure.com"
            user = "captain"
            password = "Beaconzzang!"
            port = 3306
            database = "testdb"
            ssl_ca = os.path.abspath(__file__)[:-15]+"DigiCertGlobalRootCA.crt.pem"
            ssl_disabled = False

            conn = pymysql.connect(host=host, user=user, password=password, port=port, database=database, ssl_ca=ssl_ca, ssl_disabled=ssl_disabled, charset='utf8')
        elif target == "azure-beacon":
            host = "projectbeacon-db.mysql.database.azure.com"
            user = "captain"
            password = "Beaconzzang!"
            port = 3306
            database = "beacon"
            ssl_ca = os.path.abspath(__file__)[:-15]+"DigiCertGlobalRootCA.crt.pem"
            ssl_disabled = False

            conn = pymysql.connect(host=host, user=user, password=password, port=port, database=database, ssl_ca=ssl_ca, ssl_disabled=ssl_disabled, charset='utf8')
        
        self.conn = conn
        self.cursor = conn.cursor()

    def execute(self, sql):
        self.cursor.execute(sql)
    
    def fetchall(self):
        return self.cursor.fetchall()

    def efp(self, sql):
        self.cursor.execute(sql)
        rows = self.cursor.fetchall()
        return rows

    def __del__(self):
        self.conn.close()