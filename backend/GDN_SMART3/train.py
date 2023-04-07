
import torch
from torch.utils.tensorboard import SummaryWriter

import time
from util.time import *
from util.env import *

from test import *
import torch.nn.functional as F





def loss_func(y_pred, y_true):
    loss = F.mse_loss(y_pred, y_true, reduction='mean')

    return loss



def train(model = None, save_path = '', config={},  train_dataloader=None, val_dataloader=None, feature_map={}, dataset_name='smart', train_dataset=None):
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

    #writer.add_embedding(out_tensor)
    writer.add_embedding(out_tensor2, global_step=3)

    writer.close()

    return train_loss_list