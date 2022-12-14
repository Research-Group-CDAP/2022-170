import pandas as pd
import numpy as np
import os


def import_dataframe_from_csv(csv_name):
     directory = os.getcwd() + '/app/util/datasets/' + csv_name
     df = pd.read_csv(directory)     
     return df

def export_dataframe_to_csv(dataframe,pred_type,model_name):
     if(pred_type=='cpu'):
                path = os.getcwd() + '/app/results/prediction/cpu/pred_' +model_name + '.csv'
     elif(pred_type=='memory'):
                path = os.getcwd() + '/app/results/prediction/memory/pred_' +model_name + '.csv'
     elif(pred_type=='network'):
                path = os.getcwd() + '/app/results/prediction/network/pred_' +model_name + '.csv'           
     dataframe.to_csv(path, header=None)   
     


def np_arr_to_df(np_array):
     return pd.DataFrame(np_array)