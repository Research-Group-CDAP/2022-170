from sklearn.preprocessing import MinMaxScaler, StandardScaler
import numpy as np


def split_test_and_train(dataframe, train_ratio):
    train_size = int(len(dataframe)*train_ratio)
    train_data = dataframe.iloc[:train_size]
    test_data = dataframe.iloc[train_size:]
    return train_data, test_data


def scale_data_using_minmax_scaler(train_data, test_data):
    scaler = MinMaxScaler().fit(train_data)
    train_scaled = scaler.transform(train_data)
    test_scaled = scaler.transform(test_data)
    return train_scaled, test_scaled

def scale_data(scaler,data):
    scaled_data = scaler.transform(data)
    return scaled_data

def inverse_scale_data(scaler,data):
    return scaler.inverse_transform(data)

# Create input dataset
def create_dataset(X, look_back=1):
    Xs, ys = [], []

    for i in range(len(X)-look_back):
        v = X[i:i+look_back]
        Xs.append(v)
        ys.append(X[i+look_back])
    
    return np.array(Xs), np.array(ys)
