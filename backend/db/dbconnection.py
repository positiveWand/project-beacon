# STEP 1
from .pool import Pool

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
            self.database = "test_db"
            self.ssl_disabled = True

        elif target == "azure-cnudb":
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
        
        self.initPool()

    def initPool(self):
        self.connPool = Pool(host=self.host, port=self.port, user=self.user, password=self.password, db=self.database, interval=100, charset='utf8', max_size=10)
        self.connPool.init()
    
    def destoryPool(self):
        self.connPool.destroy()
        self.connPool = None
    
    def efo(self, sql, data = (), count=0):
        try:
            conn = self.connPool.get_conn()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            aRow = cursor.fetchone()
            cursor.close()
            conn.commit()
            self.connPool.release(conn)
            return aRow # None 일수도...
        except Exception as e:
            print(e)
            if(count < 5):
                self.destoryPool()
                self.initPool()
                self.efo(sql, data, count+1)
            else:
                raise Exception("DB Connection Error")

    def efa(self, sql, data = (), count=0):
        try:
            conn = self.connPool.get_conn()
            cursor = conn.cursor()
            cursor.execute(sql, data)
            rows = cursor.fetchall()
            cursor.close()
            conn.commit()
            self.connPool.release(conn)
            return rows
        except Exception as e:
            print('[efa]:', e)
            if(count < 5):
                self.destoryPool()
                self.initPool()
                self.efa(sql, data, count+1)
            else:
                raise Exception("DB Connection Error")
    
    def ec(self, sql, data = (), count=0):
        try:
            conn = self.connPool.get_conn()
            cursor = conn.cursor()
            rows = cursor.execute(sql, data)
            cursor.close()
            conn.commit()
            self.connPool.release(conn)
            return rows
        except Exception as e:
            print(e)
            raise Exception("DB Connection Error")