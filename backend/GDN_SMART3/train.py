from torch.utils.tensorboard import SummaryWriter
import numpy as np
import time
from util.env import get_device
import torch
from test import *
import torch.nn.functional as F
import tensorflow as tf
import tensorboard as tb




def loss_func(y_pred, y_true):
    loss = F.mse_loss(y_pred, y_true, reduction='mean')

    return loss

def anomaly_score(node_embedding, c):
    # anomaly score of an instance is calculated by
    # square Euclidean distance between the node embedding and the center c
    return torch.sum((node_embedding - c) ** 2)


def nor_loss(node_embedding_list, c):
    # normal loss is calculated by mean squared Euclidian distance of
    # the normal node embeddings to hypersphere center c
    s = 0
    num_node = node_embedding_list.size()[0]
    for i in range(num_node):
        s = s + anomaly_score(node_embedding_list[i], c)

    score = 100 * (1 - (s/num_node)) # 여기 수정
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
    tf.io.gfile = tb.compat.tensorflow_stub.io.gfile
    writer = SummaryWriter('runs')
    seed = config['seed']

    optimizer = torch.optim.Adam(model.parameters(), lr=0.001, weight_decay=config['decay'])

    now = time.time()
    
    train_loss_list = []
    cmp_loss_list = []
    out_list = []
    out_list2 = []

    device = get_device()


    acu_loss = 0
    min_loss = 1e+8
    min_f1 = 0
    min_pre = 0
    best_prec = 0

    i = 0
    epoch = config['epoch']
    early_stop_win = 15

    model.train()

    log_interval = 1000
    stop_improve_count = 0

    dataloader = train_dataloader

    for i_epoch in range(epoch):

        acu_loss = 0
        model.train()

        for x, labels, attack_labels, edge_index in dataloader:
            _start = time.time()

            x, labels, edge_index = [item.float().to(device) for item in [x, labels, edge_index]]

            out = model(x, edge_index).float().to(device)


            #out = torch.tensor(out)
            out = out.cpu()
            out = out.view(-1)

            if len(out) == 72:
                out_list.append(out)
            else:
                out_list2.append(out)

            i += 1


    #out_tensor = torch.stack(out_list)
    out_tensor2 = torch.stack(out_list2)
    print(out_tensor2)
    print(out_tensor2.shape)

    # pretrained
    #out_tensor2 = out_tensor2.detach().numpy()
    #np.save("C:/Users/H/PycharmProjects/smart_ais_new/GDN_SMART3/data/smart/pretrained", out_tensor2)

    #writer.add_embedding(out_tensor)
    #writer.add_embedding(out_tensor2, global_step=None)
    #writer.close()

    pretrained = np.load("./data/smart/pretrained.npy")
    print(pretrained)
    print(pretrained.dtype)
    print(pretrained.shape)
    pretrained = pretrained.tobytes()
    # print(pretrained)
    pretrained = np.frombuffer(pretrained, dtype=np.float32)
    print(pretrained)
    print(pretrained.shape)
    pretrained = np.copy(pretrained.reshape(34222,48)) # 텐서 크기는 마지막 차원=48(=칼럼 개수)이면 됨
    pretrained = torch.Tensor(pretrained)
    print(pretrained)

    c = torch.mean(pretrained, 0)

    score = nor_loss(out_tensor2, c) # normal embedding
    #score = AUC_loss(out_tensor2, pretrained, c) # (new, pretrained, center)
    score = float(score)
    print("Anomaly Score: ", score)


    # 여기 PCA, tsne plot 찍어보기

    return score