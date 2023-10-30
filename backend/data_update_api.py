from flask import request, current_app
from db.dao.dao import DAO_Universal

def beacon_image_update():
    dao: DAO_Universal = current_app.config.get('DAO')
    print('update image API')
    if dao.update_beacon_image(request.form['beacon_id'], request.files['beacon_image'].stream.read()):
        return "UPLOAD IMAGE GOOD"
    else:
        return "UPLOAD IMAGE ERROR"
    
def beacon_embedding_update():
    dao: DAO_Universal = current_app.config.get('DAO')
    print('update embedding API')
    if dao.update_beacon_embedding(request.form['beacon_id'], request.files['beacon_embedding']):
        return "UPLOAD EMBEDDING GOOD"
    else:
        return "UPLOAD EMBEDDING ERROR"