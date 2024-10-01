from model.model import AnomalyModel
import pandas as pd

feature_list = [
    'LANTERN_STATUS', 'RACON_STATUS', 'BATTERY_STATUS', 'CHARGER_STATUS', 'SOLAR_STATUS', 'DATALOGGER_STATUS', 'SPARE_STATUS', 'MAIN_VOLT_STATUS',
    'SUB_VOLT_STATUS', 'SOLAR_VOLT_STATUS', 'WIND_VOLT_STATUS', 'WAVE_VOLT_STATUS', 'CHARGER_VOLT_STATUS', 'BATTERY_VOLT_STATUS', 'SPARE_VOLT_STATUS',
    'AIS_CURR_STATUS', 'LANTERN_CURR_STATUS', 'DATALOGGER_CURR_STATUS', 'SPARE_CURR_STATUS', 'WIND_SPEED_STATUS', 'WIND_DIRECT_STATUS', 'AIR_TEMPER_STATUS',
    'HUMIDITY_STATUS', 'DEW_POINT_STATUS', 'AIR_PRESSURE_STATUS', 'HORIZON_VISIBL_STATUS', 'WATER_LEVEL_STATUS', 'CURRENT1_STATUS', 'CURRENT2_STATUS',
    'CURRENT3_STATUS', 'WAVE_HEIGHT_STATUS', 'WAVE_DRC_STATUS', 'SWELL_HEIGHT_STATUS', 'SWELL_DRC_STATUS', 'WATER_TEMPER_STATUS', 'PRECIPI_TYPE_STATUS',
    'SALINITY_STATUS', 'ICE_STATUS', 'HEAT_PROSTR_STATUS', 'HELIOGRAPH_STATUS', 'OXYGEN_STATUS', 'OXYGEN_SATUR_STATUS', 'PH_STATUS', 'CHLOROPHYLL_STATUS',
    'MUDDINESS_STATUS', 'PRECIPI_STATUS', 'CHARGER_CURR_STATUS', 'DISCHARGER_CURR_STATUS'
]

model = AnomalyModel()
pretrained_bytes = None
with open('./model/pretrained/smart/test.pt', 'rb') as f:
    pretrained_bytes = f.read()

model.set_model(None, feature_list, pretrained_bytes)

train_orig = pd.read_csv(f'./model/data/smart/train.csv', sep=',', index_col=0)
train_orig = train_orig.fillna(0)

feature_data = {}
ground_truth_data = {}
median = {}
iqr_range = {}
for feature in feature_list:
    column = train_orig.loc[:, feature].values.tolist()
    feature_data[feature] = column[:15]
    ground_truth_data[feature] = column[15]
    median[feature] = 0
    iqr_range[feature] = 1

print(model.predict(feature_data, ground_truth_data, median, iqr_range))

