# STEP 1
from pymysqlpool.pool import Pool

class DBConnection():
    def __init__(self, target="local"):
        # [주의] ssl_ca 경로 상 한국어 있으면 안됨

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
            self.database = "cnu_db"
            self.ssl_disabled = True

        elif target == "azure-beacon":
            self.host = "projectbeacon-db.mysql.database.azure.com"
            self.user = "captain"
            self.password = "Beaconzzang!"
            self.port = 3306
            self.database = "beacon"
            self.ssl_disabled = True
        
        self.connPool = Pool(host=self.host, port=self.port, user=self.user, password=self.password, db=self.database, charset='utf8')
        self.connPool.init()
    
    def efo(self, sql, data = ()):
        conn = self.connPool.get_conn()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        aRow = cursor.fetchone()
        self.connPool.release(conn)
        return aRow

    def efa(self, sql, data = ()):
        # self.start_conn()
        # self.cursor.execute(sql, data)
        # rows = self.cursor.fetchall()
        # self.close_conn()
        conn = self.connPool.get_conn()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        rows = cursor.fetchall()
        self.connPool.release(conn)
        return rows
    
    def ec(self, sql, data = ()):
        # self.start_conn()
        # self.cursor.execute(sql, data)
        # self.conn.commit()
        # self.close_conn()
        conn = self.connPool.get_conn()
        cursor = conn.cursor()
        cursor.execute(sql, data)
        cursor.commit()
        self.connPool.release(conn)