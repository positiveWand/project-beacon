from apscheduler.schedulers.background import BackgroundScheduler
from db.dao import *

scheduler = BackgroundScheduler()
# scheduler = BlockingScheduler()

print(test(['simple_probability', 'A', 'B']))

# @scheduler.scheduled_job('cron', hour='*', minute='0,15,30,45', id='routine_job')
# def routine_job():
#     print('routine_job executing!!!!!')
#     # DB 접근하여 모델 입력 데이터 fetch
#     print(test(['simple_prediction', 'A', 'B']))
#     # 모델에 데이터 입력
#     # 모델(항로표지 임베딩, 항로표지 측정 데이터) -> 항로표지 예측 및 분석 정보

#     # 모델로부터 받은 데이터 DB에 저장

#     return

# print('sched before~')
# scheduler.start()