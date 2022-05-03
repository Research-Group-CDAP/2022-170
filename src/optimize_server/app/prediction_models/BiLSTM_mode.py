import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, LSTM,  Bidirectional

class Bidirectional_LSTM_model():
    def __init__(self, units, X_train, epochs, generator):
        self.units = units
        self.X_train = X_train
        self.epochs = epochs
        self.generator = generator

    def build_model_and_fit(self):
        model = Sequential()
        # Input layer
        model.add(Bidirectional(
            LSTM(units=self.units, return_sequences=True),
            input_shape=(self.X_train.shape[1], self.X_train.shape[2])))
        # Hidden layer
        model.add(Bidirectional(LSTM(units=units)))
        model.add(Dense(1))
        # Compile model
        model.compile(optimizer='adam', loss='mse')
        return model
