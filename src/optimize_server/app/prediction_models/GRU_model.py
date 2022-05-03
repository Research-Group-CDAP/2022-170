from tensorflow import keras
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout, GRU

class GRU_model():
    def __init__(self, units, X_train, epochs, generator):
        self.units = units
        self.X_train = X_train
        self.epochs = epochs
        self.generator = generator

    def build_model_and_fit(self):
        model = Sequential()
        # Input layer
        model.add(GRU (units = self.units, return_sequences = True, 
        input_shape = [self.X_train.shape[1], self.X_train.shape[2]]))
        model.add(Dropout(0.2)) 
        # Hidden layer
        model.add(GRU(units = self.units)) 
        model.add(Dropout(0.2))
        model.add(Dense(units = 1)) 
        #Compile model
        model.compile(optimizer='adam',loss='mse')
        return model
