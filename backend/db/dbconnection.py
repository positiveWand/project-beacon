# STEP 1
import pymysql

class DBConnection():
    def __init__(self, target="local"):
        # [주의] ssl_ca 경로 상 한국어 있으면 안됨
        conn = None

        if target == "local":
            self.host = "localhost"
            self.user = "test"
            self.password = 'testpassword'
            self.database = 'testdb'

        elif target == "azure-testdb":
            self.host = "projectbeacon-db.mysql.database.azure.com"
            self.user = "captain"
            self.password = "Beaconzzang!"
            self.port = 3306
            self.database = "testdb"
            self.ssl_disabled = True

        elif target == "azure-beacon":
            self.host = "projectbeacon-db.mysql.database.azure.com"
            self.user = "captain"
            self.password = "Beaconzzang!"
            self.port = 3306
            self.database = "beacon"
            self.ssl_disabled = True
    
    def start_conn(self):
        self.conn = pymysql.connect(host=self.host, user=self.user, password=self.password, port=self.port, database=self.database, ssl_disabled=self.ssl_disabled, charset='utf8')
        self.cursor = self.conn.cursor(pymysql.cursors.DictCursor)
    def close_conn(self):
        self.conn.close()
    
    def efo(self, sql, data = ()):
        self.start_conn()
        self.cursor.execute(sql, data)
        aRow = self.cursor.fetchone()
        self.close_conn()
        return aRow

    def efa(self, sql, data = ()):
        self.start_conn()
        self.cursor.execute(sql, data)
        rows = self.cursor.fetchall()
        self.close_conn()
        return rows
    
    def ec(self, sql, data = ()):
        self.start_conn()
        self.cursor.execute(sql, data)
        self.conn.commit()
        self.close_conn()