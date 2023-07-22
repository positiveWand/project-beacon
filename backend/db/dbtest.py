import dbconnection
import numpy as np

dao = dbconnection.DBConnection("azure-testdb")

# print(str(dao.efa("SELECT * FROM user")))
# print(str(dao.efa("SELECT * FROM beacon")))

# pretrained = np.load("./backend/db/dto/pretrained.npy")
# print(pretrained)
# pretrained = pretrained.tobytes()

# sql = 'INSERT INTO `EMBEDDING` VALUES (%s, %s)'
# dao.ec(sql, (1, pretrained))

# sql = 'SELECT * FROM EMBEDDING WHERE `id` = 1'
# r = dao.efo(sql)
# fetched_pretrained = np.frombuffer(r['rep'], dtype=np.float32)
# fetched_pretrained = np.copy(fetched_pretrained.reshape(34222,48))
# print(fetched_pretrained)

sql = 'INSERT INTO `PREDICT_LOG` VALUES (%s, NOW(), %s)'
dao.ec(sql, (1, -242))