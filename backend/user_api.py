from flask import request, session, jsonify, current_app
from db.dao.dao import DAO_Universal

def signup_request():
    dao: DAO_Universal = current_app.config.get('DAO')
    body: dict = request.get_json()
    body.setdefault(None)
    if body['id'] in map(lambda user: user.id, dao.select_all_users()):
        return "false"
    else :
        dao.insert_user(body['id'], body['password'], body['email'])
        return "true"

def login_request():
    dao: DAO_Universal = current_app.config.get('DAO')
    body = request.get_json()
    print("로그인 요청", body)

    resObject = {
        'id': None,
        'result': 'false'
    }

    for aUser in dao.select_all_users():
        if aUser.id == body['id'] and aUser.password == body['password']:
            resObject['id'] = body['id']
            session['id'] =   resObject['id']
            resObject['result'] = 'true'
            break

    print('로그인 요청 처리 완료', session)
    return jsonify(resObject)

def login_check() :
    print('로그인 확인 요청', session)
    resObject = {
        'id': None,
        'result': 'false'
    }
    if 'id' in session:
        resObject['id'] = session['id']
        resObject['result'] = 'true'

    return jsonify(resObject)

def logout_request() :
    session.pop('id', None)
    return "true"


def favorite_check():
    dao: DAO_Universal = current_app.config.get('DAO')
    if 'id' in session:
        if len(dao.select_favorites(session['id'], request.args.get('id'))) != 0:
            return 'true' 
    return 'false'
    

def favorite_all() :
    dao: DAO_Universal = current_app.config.get('DAO')
    if 'id' in session:
        return jsonify(list(map(lambda favor: favor.beacon, dao.select_favorites(session['id'], None))))

    return jsonify(None)


def favorite_insert():
    dao: DAO_Universal = current_app.config.get('DAO')
    body = request.get_json()
    if 'id' in session:
        if dao.insert_favorites(session['id'], body['beacon_id']):
            return 'true'
        
    return "false"
    

def favorite_delete():
    dao: DAO_Universal = current_app.config.get('DAO')
    body = request.get_json()
    if 'id' in session :
        if dao.delete_favorites(session['id'], body['beacon_id']):
            return 'true'
        
    return 'false'