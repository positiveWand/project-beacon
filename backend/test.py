import pandas as pd

def classify_time_series(data, window_size=5, threshold=0.01):
    # Compute a rolling window mean with the specified window size
    rolling_mean = data.rolling(window=window_size).mean()

    # Calculate the difference between the original data and the rolling mean
    diff = data - rolling_mean

    # Classify the data points based on the threshold
    result = []
    for d in diff:
        if d > threshold:
            result.append("increase")
        elif d < -threshold:
            result.append("decrease")
        else:
            result.append("constant")

    return result

# Example usage
data = pd.Series([1.0, 1.2, 1.3, 1.5, 1.4, 1.7, 1.6, 1.4, 1.2, 1.0])
result = classify_time_series(data, window_size=3, threshold=0.1)

for i, phase in enumerate(result):
    print(f"Data point {i}: {phase} Phase")

print(result[-4:])