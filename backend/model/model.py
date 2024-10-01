from .GDN import GDN
import torch
import io
import numpy as np

class AnomalyModel:
    def __init__(self):
        self.model = None
    
    def set_model(self, config, feature_list, pretrained):
        # config를 class로 분리?
        if config:
            self.config = config
        else:
            self.config = {
                'slide_win': 15,
                'dim': 64,
                'slide_stride': 5,
                'out_layer_num': 1,
                'out_layer_inter_dim': 256,
                'topk': 5,
                'device': 'cuda',
                'load_model_path': './pretrained'
            }

        self.device = self.config['device']
        self.feature_list = feature_list
        fc_struc = self.get_fc_graph_struc(feature_list)
        fc_edge_index = self.build_loc_net(fc_struc, feature_list)
        self.edge_index = torch.tensor(fc_edge_index, dtype=torch.long).to(self.device)

        edge_index_sets = [self.edge_index]
        self.model = GDN(edge_index_sets, len(feature_list),
                        dim = self.config['dim'],
                        input_dim = self.config['slide_win'],
                        out_layer_num = self.config['out_layer_num'],
                        topk = self.config['topk']
                    ).to(self.device)

        # 모델 파라미터 적용
        self.model.load_state_dict(torch.load(io.BytesIO(pretrained)))
        self.model.eval()

    def predict(self, feature_data, truth_data, median, iqr_range):
        x = self.process_data(feature_data, to_tensor=True, unsqueeze=True)
        y = self.process_data(truth_data)

        median = np.array(self.process_data(median))
        iqr_range = np.array(self.process_data(iqr_range))

        predicted = self.model(x, self.edge_index).float().cpu()
        predicted = torch.squeeze(predicted).detach().numpy().astype(np.float64)

        # np.set_printoptions(precision=6, suppress=True)
        # print(predicted.tolist())
        # print(y)

        # deviation 계산
        deviations = np.abs(np.subtract(predicted, y))

        # 값 정규화
        epsilon = 1e-2
        anomaly_scores = np.abs(deviations - median) / np.abs(iqr_range + epsilon)

        return anomaly_scores.tolist()

    def process_data(self, data, to_tensor=False, unsqueeze=False):
        result = []
        for feature in self.feature_list:
            if feature not in data:
                print(f"feature({feature}) doesn't exist in data.")
            result.append(data[feature])
        
        if to_tensor:
            result = torch.tensor(result)
            if unsqueeze:
                result = torch.unsqueeze(result, dim=0)
            result = result.contiguous()
            result = result.to(self.device)
        return result

    def get_fc_graph_struc(self, feature_list):
        struc_map = {}

        for feature in feature_list:
            if feature not in struc_map:
                struc_map[feature] = []

            for other_feature in feature_list:
                if other_feature is not feature:
                    struc_map[feature].append(other_feature)
        
        return struc_map
    
    def build_loc_net(self, struc, feature_map=[]):

        index_feature_map = feature_map
        edge_indexes = [
            [],
            []
        ]
        for node_name, neighbor_list in struc.items():

            if node_name not in index_feature_map:
                index_feature_map.append(node_name)
            
            p_index = index_feature_map.index(node_name)
            for neighbor in neighbor_list:

                if neighbor not in index_feature_map:
                    print(f'error: {neighbor} not in index_feature_map')
                    # index_feature_map.append(child)

                c_index = index_feature_map.index(neighbor)
                # edge_indexes[0].append(p_index)
                # edge_indexes[1].append(c_index)
                edge_indexes[0].append(c_index)
                edge_indexes[1].append(p_index)
        
        return edge_indexes
