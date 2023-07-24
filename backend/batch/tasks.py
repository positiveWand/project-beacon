import time

def test_task(n):
    for i in range(n):
        print('Working... {}/{}'.format(i+1, n))
        time.sleep(1)