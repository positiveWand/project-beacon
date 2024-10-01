import datetime

class DataModel():
    attr_map = {}
    
    def __init__(self) -> None:
        self.attr_map = DataModel.attr_map
        self.datetimeformat = '%Y-%m-%d %H:%M:%S'
        self.dateformat = '%Y-%m-%d'
        return
    
    def to_dict(self) -> dict:
        result = {}
        attrs = vars(self)

        for col in self.attr_map.keys():
            result[col] = attrs[self.attr_map[col]]
            if result[col] != None:
                if type(result[col]) == datetime.datetime:
                    result[col] = result[col].strftime(self.datetimeformat)
                if type(result[col]) == datetime.date:
                    result[col] = result[col].strftime(self.dateformat)
        
        return result