# -*- coding: utf-8 -*-
import pandas as pd
import numpy as np
import torch
from torch.utils.data import DataLoader, Subset
from util.env import get_device, set_device
from util.preprocess import build_loc_net, construct_data
from util.net_struct import get_feature_map, get_fc_graph_struc
from datasets.TimeDataset import TimeDataset
from models.GDN import GDN
from train import train
from evaluate import get_best_performance_data, get_val_performance_data, get_full_err_scores

import sys
from datetime import datetime
import os
import argparse
from pathlib import Path
import random


class Main():
    def __init__(self, train_config, env_config, debug=False):

        self.train_config = train_config
        self.env_config = env_config
        self.datestr = None

        # 데이터 로드
        dataset = self.env_config['dataset']
        #train_orig = pd.read_csv(f'./data/{dataset}/994403586_2018.csv', sep=',', index_col=0)
        # train_orig = pd.read_csv(f'./data/{dataset}/anomaly.csv', sep=',', index_col=0)
        # train_orig = pd.read_csv(f'./data/{dataset}/anomaly2.csv', sep=',', index_col=0)
        train_orig = pd.read_csv(f'./data/{dataset}/normal.csv', sep=',', index_col=0)
        train_orig = train_orig.fillna(0)

        # 고장예측 장비 칼럼
        train = train_orig[[
            'LANTERN_STATUS', 'RACON_STATUS', 'BATTERY_STATUS', 'CHARGER_STATUS', 'SOLAR_STATUS', 'DATALOGGER_STATUS', 'SPARE_STATUS', 'MAIN_VOLT_STATUS',
            'SUB_VOLT_STATUS', 'SOLAR_VOLT_STATUS', 'WIND_VOLT_STATUS', 'WAVE_VOLT_STATUS', 'CHARGER_VOLT_STATUS', 'BATTERY_VOLT_STATUS', 'SPARE_VOLT_STATUS',
            'AIS_CURR_STATUS', 'LANTERN_CURR_STATUS', 'DATALOGGER_CURR_STATUS', 'SPARE_CURR_STATUS', 'WIND_SPEED_STATUS', 'WIND_DIRECT_STATUS', 'AIR_TEMPER_STATUS',
            'HUMIDITY_STATUS', 'DEW_POINT_STATUS', 'AIR_PRESSURE_STATUS', 'HORIZON_VISIBL_STATUS', 'WATER_LEVEL_STATUS', 'CURRENT1_STATUS', 'CURRENT2_STATUS',
            'CURRENT3_STATUS', 'WAVE_HEIGHT_STATUS', 'WAVE_DRC_STATUS', 'SWELL_HEIGHT_STATUS', 'SWELL_DRC_STATUS', 'WATER_TEMPER_STATUS', 'PRECIPI_TYPE_STATUS',
            'SALINITY_STATUS', 'ICE_STATUS', 'HEAT_PROSTR_STATUS', 'HELIOGRAPH_STATUS', 'OXYGEN_STATUS', 'OXYGEN_SATUR_STATUS', 'PH_STATUS', 'CHLOROPHYLL_STATUS',
            'MUDDINESS_STATUS', 'PRECIPI_STATUS', 'CHARGER_CURR_STATUS', 'DISCHARGER_CURR_STATUS'
            ]]

        # 그래프 구축
        feature_map = get_feature_map(dataset)
        fc_struc = get_fc_graph_struc(dataset)
        set_device(env_config['device'])
        self.device = get_device()
        self.feature_map = feature_map
        fc_edge_index = build_loc_net(fc_struc, list(train.columns), feature_map=feature_map)
        fc_edge_index = torch.tensor(fc_edge_index, dtype=torch.long)
        train_dataset_indata = construct_data(train, feature_map, labels=0)

        cfg = {
            'slide_win': train_config['slide_win'],
            'slide_stride': train_config['slide_stride'],
        }

        train_dataset = TimeDataset(train_dataset_indata, fc_edge_index, mode='train', config=cfg)

        train_dataloader, val_dataloader = self.get_loaders(train_dataset, train_config['seed'], train_config['batch'],
                                                            val_ratio=train_config['val_ratio'])

        self.train_dataset = train_dataset
        self.train_dataloader = train_dataloader
        self.val_dataloader = val_dataloader

        edge_index_sets = []
        edge_index_sets.append(fc_edge_index)

        if args.train_mode == 'pretrain':
            self.model = GDN(edge_index_sets, len(feature_map),
                         dim=train_config['dim'],
                         input_dim=train_config['slide_win'],
                         out_layer_num=train_config['out_layer_num'],
                         out_layer_inter_dim=train_config['out_layer_inter_dim'],
                         topk=train_config['topk']
                         ).to(self.device)
        else:
            self.model.load_state_dict(torch.load('checkpoints/pretrained_model.pkl'))


    def run(self):
        if len(self.env_config['load_model_path']) > 0:
            model_save_path = self.env_config['load_model_path']
        else:
            model_save_path = self.get_save_path()[0]

            score = train(self.model, model_save_path,
                                   config=train_config,
                                   train_dataloader=self.train_dataloader,
                                   val_dataloader=self.val_dataloader,
                                   feature_map=self.feature_map,
                                   train_dataset=self.train_dataset,
                                   dataset_name=self.env_config['dataset'])

        return score


    def get_loaders(self, train_dataset, seed, batch, val_ratio=0.1):
        dataset_len = int(len(train_dataset))
        train_use_len = int(dataset_len * (1 - val_ratio))
        val_use_len = int(dataset_len * val_ratio)
        val_start_index = random.randrange(train_use_len)
        indices = torch.arange(dataset_len)

        train_sub_indices = torch.cat([indices[:val_start_index], indices[val_start_index + val_use_len:]])
        train_subset = Subset(train_dataset, train_sub_indices)

        val_sub_indices = indices[val_start_index:val_start_index + val_use_len]
        val_subset = Subset(train_dataset, val_sub_indices)

        #train_dataloader = DataLoader(train_subset, batch_size=batch,
        #                              shuffle=True)

        train_dataloader = DataLoader(train_dataset, batch_size=batch, shuffle=True)

        val_dataloader = DataLoader(val_subset, batch_size=batch,
                                    shuffle=False)

        return train_dataloader, val_dataloader

    def get_score(self, test_result, val_result):
        feature_num = len(test_result[0][0])
        np_test_result = np.array(test_result)
        np_val_result = np.array(val_result)

        test_labels = np_test_result[2, :, 0].tolist()

        test_scores, normal_scores = get_full_err_scores(test_result, val_result)

        top1_best_info = get_best_performance_data(test_scores, test_labels, topk=1)
        top1_val_info = get_val_performance_data(test_scores, normal_scores, test_labels, topk=1)

        print('=========================** Result **============================\n')

        info = None
        if self.env_config['report'] == 'best':
            info = top1_best_info
        elif self.env_config['report'] == 'val':
            info = top1_val_info

        print(f'F1 score: {info[0]}')
        print(f'precision: {info[1]}')
        print(f'recall: {info[2]}\n')

    def get_save_path(self, feature_name=''):
        dir_path = self.env_config['save_path']

        if self.datestr is None:
            now = datetime.now()
            self.datestr = now.strftime('%m %d-%H-%M-%S')
        datestr = self.datestr

        paths = [
            f'./pretrained/{dir_path}/best_{datestr}.pt',
            f'./results/{dir_path}/{datestr}.csv',
        ]

        for path in paths:
            dirname = os.path.dirname(path)
            Path(dirname).mkdir(parents=True, exist_ok=True)

        return paths


if __name__ == "__main__":
    parser = argparse.ArgumentParser()

    parser.add_argument('-batch', help='batch size', type=int, default=1)
    parser.add_argument('-epoch', help='train epoch', type=int, default=1)
    parser.add_argument('-slide_win', help='slide_win', type=int, default=5)
    parser.add_argument('-dim', help='dimension', type=int, default=64)
    parser.add_argument('-slide_stride', help='slide_stride', type=int, default=2)
    parser.add_argument('-save_path_pattern', help='save path pattern', type=str, default='msl')
    parser.add_argument('-dataset', help='wadi / swat', type=str, default='smart')
    parser.add_argument('-device', help='cuda / cpu', type=str, default='cpu')
    parser.add_argument('-random_seed', help='random seed', type=int, default=0)
    parser.add_argument('-comment', help='experiment comment', type=str, default='')
    parser.add_argument('-out_layer_num', help='outlayer num', type=int, default=3)
    parser.add_argument('-out_layer_inter_dim', help='out_layer_inter_dim', type=int, default=256)
    parser.add_argument('-decay', help='decay', type=float, default=0)
    parser.add_argument('-val_ratio', help='val ratio', type=float, default=0.1)
    parser.add_argument('-topk', help='topk num', type=int, default=20)
    parser.add_argument('-report', help='best / val', type=str, default='best')
    parser.add_argument('-load_model_path', help='trained model path', type=str, default='')
    parser.add_argument('-train_mode', type=str, default='pretrain')

    args = parser.parse_args()

    random.seed(args.random_seed)
    np.random.seed(args.random_seed)
    torch.manual_seed(args.random_seed)
    torch.cuda.manual_seed(args.random_seed)
    torch.cuda.manual_seed_all(args.random_seed)
    torch.backends.cudnn.benchmark = False
    torch.backends.cudnn.deterministic = True
    os.environ['PYTHONHASHSEED'] = str(args.random_seed)

    train_config = {
        'batch': args.batch,
        'epoch': args.epoch,
        'slide_win': args.slide_win,
        'dim': args.dim,
        'slide_stride': args.slide_stride,
        'comment': args.comment,
        'seed': args.random_seed,
        'out_layer_num': args.out_layer_num,
        'out_layer_inter_dim': args.out_layer_inter_dim,
        'decay': args.decay,
        'val_ratio': args.val_ratio,
        'topk': args.topk,
        'train_mode': args.train_mode
    }

    env_config = {
        'save_path': args.save_path_pattern,
        'dataset': args.dataset,
        'report': args.report,
        'device': args.device,
        'load_model_path': args.load_model_path
    }

    main = Main(train_config, env_config, debug=False)
    main.run()
