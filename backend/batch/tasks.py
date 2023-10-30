from datetime import datetime, timedelta
import threading
import queue
from .job import Job
from db.dao import *

work_queue = queue.Queue()
count = 0

def init_batch():
    threading.Thread(target=batch_main, daemon=True).start()

def batch_main():
    while True:
        print('consumer waiting work...')
        aWork = work_queue.get()
        print('consumer consuming job', aWork)

        # 1. 타겟 항로표지 임베딩 파일 가져오기
        # 기대 결과: 임베딩 파일
        embedding = get_embedding(aWork.beacon.id)

        # 2. 모델 입력을 위한 항로표지 측정 데이터 가져오기
        # 기대 결과: 입력 데이터
        end = datetime.strptime(aWork.latest['regist_time'], '%Y-%m-%d %H:%M:%S')
        start = end + timedelta(hours=-2)
        end = end.strftime('%Y-%m-%dT%H:%M:%S')
        start = start.strftime('%Y-%m-%dT%H:%M:%S')
        input_data = get_sensor_data(aWork.beacon.id, start, end)

        # 3. 모델 예측하기
        # 모델.예측(임베딩 파일, 입력 데이터) -> 예측 결과
        prediction_result = None

        # 4. 예측 결과 저장하기
        add_prediction()
        add_prediction()
        add_prediction()
        # 필요한만큼... 종류별(type)로...

        work_queue.task_done()

def check_new_data():
    global work_queue

    # 1. 항로표지 측정 데이터 새로운 데이터 있는지 확인하기
    beacons = get_all_beacons()
    batch_targets = []

    for aBeacon in beacons:
        # 1-1. 항로표지 모니터링 데이터 가져오기(없는 경우 생성)
        # 모니터링 데이터가 없는 경우 생성, 갱신 후 넘어감
        monitor_data = get_monitor_data(aBeacon.id)
        if monitor_data is None or monitor_data['latest_sd_id'] is None:
            latest = get_latest_sensor_data(aBeacon.id)
            if latest is None:
                update_monitor_data(aBeacon.id, None, None)
            else:
                update_monitor_data(aBeacon.id, latest['sd_id'], None)
            continue

        # 1-2. SENSOR_DATA 테이블의 가장 최근 값과 비교하기
        # 가장 최근의 센서 데이터값 가져오기
        latest = get_latest_sensor_data(aBeacon.id)
        # 모니터링 데이터와 비교하여 새로운 데이터가 들어왔는지 판단
        if monitor_data['latest_sd_id'] < latest['sd_id']:
            # 새로운 데이터가 들어온 경우... -> 작업 큐에 삽입
            batch_targets.append(aBeacon)
            # 1-3. 항로표지 모니터링 데이터 갱신하기
            # 새로운 데이터가 들어온 경우 -> true 갱신
            update_monitor_data(aBeacon.id, latest['sd_id'], 'true')
        else:
            # 새로운 데이터가 들어오지 않은 경우... -> 넘어감
            # 1-3. 항로표지 모니터링 데이터 갱신하기
            # 새로운 데이터가 들어오지 않은 경우 -> false 갱신
            update_monitor_data(aBeacon.id, latest['sd_id'], 'false')
            continue

    # 2. 새로운 데이터가 있는 항로표지 작업 큐에 넣기
    for aBeacon in batch_targets:
        work_queue.put(Job(aBeacon, latest))


def test_job():
    global count
    global work_queue
    count = count + 1
    print("["+datetime.now().strftime("%Y-%m-%d %H:%M:%S")+"]", "executing test job", count)
    work_queue.put(count)
    print('남은 작업 수:', work_queue.qsize())