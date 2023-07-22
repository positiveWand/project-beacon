# STEP 1
import pymysql

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
            ssl_disabled = True

            conn = pymysql.connect(host=host, user=user, password=password, port=port, database=database, ssl_disabled=ssl_disabled, charset='utf8')
        elif target == "azure-beacon":
            host = "projectbeacon-db.mysql.database.azure.com"
            user = "captain"
            password = "Beaconzzang!"
            port = 3306
            database = "beacon"
            ssl_disabled = True

            conn = pymysql.connect(host=host, user=user, password=password, port=port, database=database, ssl_disabled=ssl_disabled, charset='utf8')
        
        self.conn = conn
        self.cursor = conn.cursor(pymysql.cursors.DictCursor)

    def execute(self, sql, data = ()):
        self.cursor.execute(sql, data)

    def fetch(self):
        self.cursor.fetchone()
    
    def fetchall(self):
        return self.cursor.fetchall()
    
    def efo(self, sql, data = ()):
        self.cursor.execute(sql, data)
        return self.cursor.fetchone()

    def efa(self, sql, data = ()):
        self.cursor.execute(sql, data)
        rows = self.cursor.fetchall()
        return rows
    
    def ec(self, sql, data = ()):
        self.cursor.execute(sql, data)
        self.conn.commit()

    def __del__(self):
        self.conn.close()