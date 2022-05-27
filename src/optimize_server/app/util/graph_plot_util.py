import matplotlib.pyplot as plt
import numpy as np
import os

def timeseries (x_axis, y_axis, x_label,column_name,pred_type):
    plt.figure(figsize = (10, 6))
    plt.plot(x_axis, y_axis)
    plt.xlabel(x_label, {'fontsize': 12}) 
    plt.ylabel('CPU(millicores)', {'fontsize': 12})
    if(pred_type=='cpu'):
        path = os.getcwd() + '/app/results/timeseries_history/cpu/'+ column_name+'.png'
        plt.savefig(path)
    elif(pred_type=='dep'):
        path = os.getcwd() + '/app/results/timeseries_history/dependency/'+ column_name+'.png'
        plt.savefig(path)
    plt.close('all')

def timeseries_summary(dataframe):
        dataframe.plot(figsize=(20,10))
        path = os.getcwd() + '/app/results/timeseries_history/cpu/summary/summary.png'
        plt.xlabel("time", {'fontsize': 12}) 
        plt.ylabel('CPU(millicores)', {'fontsize': 12})
        plt.savefig(path)
        plt.close('all')

def timeseries_histogram(dataframe):
        dataframe.plot(kind='kde',figsize=(20,10))
        path = os.getcwd() + '/app/results/timeseries_history/cpu/summary/density_histogram.png'
        plt.xlim([0, 0.04])
        plt.savefig(path)
        plt.close('all')

def timeseries_subplot(dataframe):
        dataframe.plot(subplots=True, figsize=(30,30))
        path = os.getcwd() + '/app/results/timeseries_history/cpu/summary/timeseries_subplots.png'        
        plt.savefig(path)
        plt.close('all')


def plot_loss (history, model_name,pred_type):
        plt.figure(figsize = (10, 6))
        plt.plot(history.history['loss'])
        plt.plot(history.history['val_loss'])
        plt.title('Model Train vs Validation Loss for ' + model_name)
        plt.ylabel('Loss')
        plt.xlabel('epoch')
        plt.legend(['Train loss', 'Validation loss'], loc='upper right')
        
        if(pred_type=='cpu'):
                path = os.getcwd() + '/app/results/loss/cpu/'+ model_name+'.png'
        elif(pred_type=='dep'):
                path = os.getcwd() + '/app/results/loss/dependency/'+ model_name+'.png'
        plt.savefig(path)
        plt.close('all')
        

def plot_future(prediction, model_name, y_test,pred_type):
        plt.figure(figsize=(10, 6))
        range_future = len(prediction)
        plt.plot(np.arange(range_future), np.array(y_test), 
                label='Test   data')
        plt.plot(np.arange(range_future), 
                np.array(prediction),label='Prediction')
        plt.title('Test data vs prediction for '+ model_name)
        plt.legend(loc='upper left')
        plt.xlabel('Time')
        plt.ylabel('CPU utilization')

def plot_multi_step(history, prediction1, prediction2,pred_type):
        
        plt.figure(figsize=(15, 6))
        
        range_history = len(history)
        range_future = list(range(range_history, range_history +
                            len(prediction1)))
        plt.plot(np.arange(range_history), np.array(history), 
                label='History')
        plt.plot(range_future, np.array(prediction1),
                label='Forecasted for GRU')
        plt.plot(range_future, np.array(prediction2),
                label='Forecasted for BiLSTM')
          
        plt.legend(loc='upper right')
        plt.xlabel('Time step')
        plt.ylabel('CPU utilization')
        if(pred_type=='cpu'):
                path = os.getcwd() + '/app/results/prediction/cpu/future_step_pred.png'
        elif(pred_type=='dep'):
                path = os.getcwd() + '/app/results/prediction/dependency/future_step_pred.png'
        plt.savefig(path)
        plt.close('all')
