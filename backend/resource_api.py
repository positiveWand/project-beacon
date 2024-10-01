from flask import render_template, send_file, send_from_directory

def index():
    return render_template('index.html')

def page_main():
    # 메인페이지 라우팅
    # return render_template('/route/main/index.html')
    return render_template('/route/search/index.html')

def page_login():
    # 로그인페이지 라우팅
    return render_template('/route/login/index.html')

def page_signup():
    # 회원가입페이지 라우팅
    return render_template('/route/signup/index.html')

def page_search():
    # 탐색페이지 라우팅
    return render_template('/route/search/index.html')

def page_detail():
    # 상세페이지 라우팅
    return render_template('/route/detail/index.html')

def page_upload_insert():
    return send_file('./upload/insert.html', mimetype='text/html')

def page_upload_update():
    return send_file('./upload/update.html', mimetype='text/html')

def page_upload_simulation():
    return send_file('./upload/simulation.html', mimetype='text/html')

def resource_from_dist(filename):
    # print("resource", filename)
    return send_from_directory("../frontend/dist", filename)

def resource_from_assets(filename):
    return send_from_directory("../frontend/dist/assets", filename)