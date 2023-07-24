import threading
from .tasks import *

current_thread = None

def clear_takeoff():
    if current_thread == None:
        return True
    elif current_thread.is_alive():
        return False
    else:
        return True

def init_job(job, args):
    global current_thread

    thread = threading.Thread(target=job, args=args)
    thread.daemon = True
    thread.start()
    current_thread = thread


def print_message():
    print("[batch] 커맨드 \"print_message\" 시작 중...")
    if not clear_takeoff():
        print("[batch] 현재 실행 중인 작업이 있습니다. 커맨드 시작 실패!")
        return False
    
    print("[batch] 커맨드 \"print_message\" 시작")
    init_job(test_task, (30,))
    return True