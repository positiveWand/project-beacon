import pandas as pd
import numpy as np
import torch
from torch.utils.data import DataLoader

from .util.env import get_device, set_device
from .util.preprocess import build_loc_net, construct_data
from .util.net_struct import get_feature_map, get_fc_graph_struc

from .datasets.TimeDataset import TimeDataset

from .GDN import GDN

from .test import test
import math
from datetime import datetime

import os
from pathlib import Path

import random
import pathlib


random.seed(0)
np.random.seed(0)
torch.manual_seed(0)
torch.cuda.manual_seed(0)
torch.cuda.manual_seed_all(0)
torch.backends.cudnn.benchmark = False
torch.backends.cudnn.deterministic = True
os.environ['PYTHONHASHSEED'] = str(0)

class Predict:
    def __init__(self, debug=False):
        feature_map = get_feature_map('smart')
        fc_struc = get_fc_graph_struc('smart')

        set_device('cpu')
        self.device = get_device()

        columns = [
            'LANTERN_STATUS', 'RACON_STATUS', 'BATTERY_STATUS', 'CHARGER_STATUS', 'SOLAR_STATUS', 'DATALOGGER_STATUS', 'SPARE_STATUS', 'MAIN_VOLT_STATUS',
            'SUB_VOLT_STATUS', 'SOLAR_VOLT_STATUS', 'WIND_VOLT_STATUS', 'WAVE_VOLT_STATUS', 'CHARGER_VOLT_STATUS', 'BATTERY_VOLT_STATUS', 'SPARE_VOLT_STATUS',
            'AIS_CURR_STATUS', 'LANTERN_CURR_STATUS', 'DATALOGGER_CURR_STATUS', 'SPARE_CURR_STATUS', 'WIND_SPEED_STATUS', 'WIND_DIRECT_STATUS', 'AIR_TEMPER_STATUS',
            'HUMIDITY_STATUS', 'DEW_POINT_STATUS', 'AIR_PRESSURE_STATUS', 'HORIZON_VISIBL_STATUS', 'WATER_LEVEL_STATUS', 'CURRENT1_STATUS', 'CURRENT2_STATUS',
            'CURRENT3_STATUS', 'WAVE_HEIGHT_STATUS', 'WAVE_DRC_STATUS', 'SWELL_HEIGHT_STATUS', 'SWELL_DRC_STATUS', 'WATER_TEMPER_STATUS', 'PRECIPI_TYPE_STATUS',
            'SALINITY_STATUS', 'ICE_STATUS', 'HEAT_PROSTR_STATUS', 'HELIOGRAPH_STATUS', 'OXYGEN_STATUS', 'OXYGEN_SATUR_STATUS', 'PH_STATUS', 'CHLOROPHYLL_STATUS',
            'MUDDINESS_STATUS', 'PRECIPI_STATUS', 'CHARGER_CURR_STATUS', 'DISCHARGER_CURR_STATUS'
        ]

        self.fc_edge_index = build_loc_net(fc_struc, columns, feature_map=feature_map)
        self.fc_edge_index = torch.tensor(self.fc_edge_index, dtype = torch.long)

        self.feature_map = feature_map

        edge_index_sets = []
        edge_index_sets.append(self.fc_edge_index)

        self.model = GDN(edge_index_sets, len(feature_map), 
                        dim=64, 
                        input_dim=15,
                        out_layer_num=2,
                        out_layer_inter_dim=256,
                        topk=4
                    ).to(self.device)
        
        PATH = pathlib.Path(__file__).parent.resolve()
        model_save_path = f'{PATH}\\pretrained\\test\\pretrained.pt'
        self.model.load_state_dict(torch.load(model_save_path))
        self.model = self.model.to(self.device)


    def run(self, input: pd.DataFrame):
        input = input.fillna(0)

        if 'attack' in input.columns:
            input = input.drop(columns=['attack'])

        cfg = {
            'slide_win': 15,
            'slide_stride': 5,
        }

        input_indata = construct_data(input, self.feature_map, labels=0)
        input_dataset = TimeDataset(input_indata, self.fc_edge_index, mode='test', config=cfg)

        test_dataloader = DataLoader(input_dataset, batch_size=1,
                            shuffle=False, num_workers=0)

        _, self.test_result = test(self.model, test_dataloader)

        return self.get_score(self.test_result)
    
    def anomaly_probability(self, anomaly_score):
        k = 7
        l = 1/200
        if(anomaly_score < k):
            return 1/(1 + math.e ** (-(1/3) * (anomaly_score - k)))
        else:
            return 1/(1 + math.e ** (-l * (anomaly_score - k)))

    def get_score(self, test_result):
        prediction = np.array(test_result[0])
        ground_truth = np.array(test_result[1])

        anomaly_score = np.abs(np.subtract(ground_truth, prediction)).mean(0).sum()

        return anomaly_score, self.anomaly_probability(anomaly_score)


    def get_save_path(self, feature_name=''):

        dir_path = self.env_config['save_path']
        
        if self.datestr is None:
            now = datetime.now()
            self.datestr = now.strftime('%mT%d-%H-M-%S')
        datestr = self.datestr          
        PATH = os.getcwd()
        paths = [
            f'{PATH}\\pretrained\\{dir_path}\\best_{datestr}.pt',
            f'{PATH}\\results\\{dir_path}\\{datestr}.csv',
        ]

        for path in paths:
            dirname = os.path.dirname(path)
            Path(dirname).mkdir(parents=True, exist_ok=True)

        return paths

# input = pd.read_csv('./data/smart/anomaly3.csv')

# print(Predict().run(input))