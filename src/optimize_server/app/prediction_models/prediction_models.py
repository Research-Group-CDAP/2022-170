from pyexpat import model
import pandas as  pd
from pandas.tseries.offsets import DateOffset
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
import tensorflow as tf
from ..load_prediction.univariate_LSTM_model import univariate_LSTM_model



def json_load_prediction(dataset_path, split_size, past_history, train_batch_size, test_batch_size, num_epochs, num_pred,num_features):
    #formatting dataset util function
    formatted_dataset = pd.read_csv(dataset_path)
    formatted_dataset['timestamp'] = pd.to_datetime(formatted_dataset['timestamp'])
    formatted_dataset = formatted_dataset.set_index('timestamp')
    #formatting dataset util function end

    #creating the pred dates util function
    future_dates = []
    start_date  = formatted_dataset.index[-1]
    for x in range(0,num_pred):
        new_date = pd.to_datetime(start_date + DateOffset(minutes=5))
        future_dates.append(new_date)
        start_date = new_date
    #creating the pred dates util function end
    run_prediction(formatted_dataset,split_size,past_history,train_batch_size,test_batch_size, num_epochs, num_pred,num_features, future_dates)

def run_prediction(formatted_dataset, split_size,time_steps, past_history, train_batch_size, test_batch_size, num_epochs, num_pred,num_features, future_dates):
    dataset = formatted_dataset
    for col in dataset.columns:
        print("current link / pod ", col)
        feature = [col]

        #split data into test and train
        train, test = formatted_dataset.iloc[0:int(len(formatted_dataset) * split_size)],formatted_dataset.iloc[(len(formatted_dataset) - (int(len(formatted_dataset) * split_size))):len(formatted_dataset)]
        #split data into test and train end

        y_train = train[feature].values.reshape((-1,1))
        y_test = test[feature].values.reshape((-1,1))

        sc = MinMaxScaler(feature_range=(-1,1))
        y_train_scaled = sc.fit_transform(y_train)
        y_test_scaled = sc.fit_transform(y_test)

        train_generator = tf.keras.preprocessing.sequence.TimeseriesGenerator(y_train_scaled, y_train_scaled, length=time_steps,batch_size=train_batch_size)
        test_generator = tf.keras.preprocessing.sequence.TimeseriesGenerator(y_test_scaled, y_test_scaled, length=time_steps,batch_size=test_batch_size)

        lstm = univariate_LSTM_model(time_steps,num_features,num_epochs,train_generator)
        model = lstm.model_build()
        predictions = model.predict_generator(test_generator)

        print(predictions)