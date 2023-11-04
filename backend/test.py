# import pandas as pd

# def classify_time_series(data, window_size=5, threshold=0.01):
#     # Compute a rolling window mean with the specified window size
#     rolling_mean = data.rolling(window=window_size).mean()

#     # Calculate the difference between the original data and the rolling mean
#     diff = data - rolling_mean

#     # Classify the data points based on the threshold
#     result = []
#     for d in diff:
#         if d > threshold:
#             result.append("increase")
#         elif d < -threshold:
#             result.append("decrease")
#         else:
#             result.append("constant")

#     return result

# # Example usage
# data = pd.Series([1.0, 1.2, 1.3, 1.5, 1.4, 1.7, 1.6, 1.4, 1.2, 1.0])
# result = classify_time_series(data, window_size=3, threshold=0.1)

# for i, phase in enumerate(result):
#     print(f"Data point {i}: {phase} Phase")

# print(result[-4:])
import math

def anomaly_probability(anomaly_score):
    # anomaly_score = math.sqrt(anomaly_score)
    k = 7
    l = 1/100
    if(anomaly_score < k):
        # return anomaly_score/(2 * k)
        return 1/(1 + math.e ** (-1 * (anomaly_score - k)))
    else:
        return 1/(1 + math.e ** (-l * (anomaly_score - k)))
    
for i in [1,2,3,4,5, 10, 15, 20, 25,30, 50, 100, 150, 200, 250, 300, 400, 500]:
    print(i, ':', anomaly_probability(i))