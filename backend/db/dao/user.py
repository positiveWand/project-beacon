from ..dto.user import  *
from ..dbconnection import DBConnection

class DAO_User:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_all_users(self) -> list[User]:
        user_list = []
        query = 'SELECT * FROM `Beacon_user`'

        for user in self.db.efa(query):
            user_list.append(User(user))
        
        return user_list

    def select_user(self, id: str, password: str) -> User | None:
        query = 'SELECT * FROM `Beacon_user` WHERE `user_id` = %s and `user_password` = %s'
        s_user = self.db.efo(query,(id ,password))
        if s_user is not None:
            return User(s_user)
        else:
            return None

    def insert_user(self, id: str, password: str, email: str):
        query = 'INSERT INTO `Beacon_user` (user_id,user_password,user_email) values(%s,%s,%s)'
        try:
            self.db.ec(query, (id, password, email))
            return True
        except:
            return False