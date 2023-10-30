from ..dto.favorites import  *
from ..dbconnection import DBConnection

class DAO_Favorites:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_favorites(self, user_id: str, beacon_id: str=None) -> list[Favorite]:
        favorites_list = []
        if beacon_id is None:
            # print(user_id)
            query = 'SELECT `beacon_id` FROM `favorites` WHERE `user_id` = %s' 

            for aFavorite in self.db.efa(query, (user_id)):
                favorites_list.append(Favorite(aFavorite))
        else:
            query = 'SELECT * FROM `favorites` WHERE `user_id` = %s and `beacon_id` = %s'
            for aFavorite in self.db.efa(query, (user_id, beacon_id)):
                favorites_list.append(Favorite(aFavorite))

        return favorites_list
    
    def insert_favorites(self, user_id: str, beacon_id: str):
        query = 'INSERT INTO `favorites` (user_id,beacon_id) values(%s,%s)'
        try:
            self.db.ec(query, (user_id, beacon_id))
            return True
        except:
            return False
    
    def delete_favorites(self, user_id: str, beacon_id: str):
        query = 'DELETE FROM `favorites` WHERE `user_id`= %s and `beacon_id` = %s'
        try:
            self.db.ec(query,(user_id,beacon_id))
            return True
        except:
            return False
