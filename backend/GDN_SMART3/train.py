import numpy as np
import torch.nn
import math
from test import *
import torch.nn.functional as F




def loss_func(y_pred, y_true):
    loss = F.mse_loss(y_pred, y_true, reduction='mean')

    return loss

def anomaly_score(c, node_embedding):
    # anomaly score of an instance is calculated by
    # square Euclidean distance between the node embedding and the center c
    return (torch.mean(c) - max(node_embedding)) ** 2


def nor_loss(node_embedding_list, c):
    # normal loss is calculated by mean squared Euclidian distance of
    # the normal node embeddings to hypersphere center c
    s = 0
    num_node = node_embedding_list.size()[0]
    for i in range(num_node):
        s = s + anomaly_score(c, node_embedding_list[i])

    avg_dist = s/num_node
    center = torch.mean(c)
    score = torch.abs(center - avg_dist) * 100

    if score >= 100:
        score = 99

    return score

def AUC_loss(anomaly_node_emb, normal_node_emb, c):
    # AUC_loss encourages the score of anomaly instances to be higher than those of normal instances
    s = 0
    num_anomaly_node = anomaly_node_emb.size()[0]
    num_normal_node = normal_node_emb.size()[0]
    for i in range(num_anomaly_node):
        for j in range(num_normal_node):
            s1 = anomaly_score(anomaly_node_emb[i], c)
            s2 = anomaly_score(normal_node_emb[j], c)
            s = s + torch.sigmoid(s1 - s2)

    total_score = 100 * (s/(num_anomaly_node * num_normal_node))
    return total_score


def train(model = None, save_path = '', config={},  train_dataloader=None, val_dataloader=None, feature_map={}, dataset_name='smart', train_dataset=None):
    seed = config['seed']

    optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=config['decay'])

    now = time.time()
    
    train_loss_list = []
    cmp_loss_list = []
    out_list = []
    out_list2 = []

    device = get_device()
    epoch = config['epoch']
    model.train()
    dataloader = train_dataloader

    for i_epoch in range(epoch):
        model.train()

        for x, labels, attack_labels, edge_index in dataloader:
            _start = time.time()

            x, labels, edge_index = [item.float().to(device) for item in [x, labels, edge_index]]

            optimizer.zero_grad()
            out = model(x, edge_index).float().to(device)
            optimizer.step()

            out = out.cpu()
            out = out.view(-1)

            if len(out) == 72:
                out_list.append(out)
            else:
                out_list2.append(out)

    out_tensor2 = torch.stack(out_list2)

    if config['train_mode'] == 'pretrain':
        pretrained = np.load("./data/smart/pretrained.npy")
        pretrained = torch.Tensor(pretrained)
    else:
        torch.save(model.state_dict(), 'checkpoints/pretrained_model.pkl')
        np.save('C:/Users/H/PycharmProjects/smart_ais_new/GDN_SMART3/data/smart', out_tensor2)

    c = torch.mean(pretrained, 0)

    score = nor_loss(out_tensor2, c) # normal embedding
    #score = AUC_loss(out_tensor2, pretrained, c) # (new, pretrained, center)
    score = float(score)
    print("Anomaly Score: ", score)

    return score