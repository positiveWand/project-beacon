import datetime
from ..dto.inspection import  *
from ..dbconnection import DBConnection

class DAO_Inspection:
    def __init__(self, conn: DBConnection):
        self.db = conn

    def select_inspections(self, beacon_id: str) -> list[Inspection]:
        inspection_list = []
        query = 'SELECT * FROM `inspection_logs` WHERE `beacon_id` = %s order by `inspection_startDate` desc'

        for inspection in self.db.efa(query, beacon_id):
            inspection_list.append(Inspection(inspection))
                        
        return inspection_list

    def insert_inspection(self, inspection_id: str, beacon_id: str,
                          inspector: str, purpose: str, content: str, note: str,
                          start_date: datetime.datetime, end_date: datetime.datetime):
        query = "INSERT INTO `inspection_logs` (inspection_id, beacon_id, inspection_inspector, inspection_purpose,\
          inspection_content, inspection_note, inspection_startDate, inspection_endDate)\
            values(%s,%s,%s,%s,%s,%s,%s,%s)"
        try:
            self.db.ec(query, (inspection_id, beacon_id, inspector, purpose, content, note, start_date, end_date))
            return True
        except:
            return False