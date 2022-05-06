from tensorflow import keras
from tensorflow.keras import Sequential
from tensorflow.keras.layers import Dense, Dropout, GRU

class GRU_model():
    def __init__(self, units, X_train,Y_train,epohs,batch_size):
        self.units = units
        self.X_train = X_train
        self.Y_train = Y_train
        self.epohs = epohs
        self.batch_size = batch_size
        

    def build_model(self):
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

    def fit_model(self,model):
        early_stop = keras.callbacks.EarlyStopping(monitor='val_loss',
                                                   patience=50)
        history = model.fit(self.X_train, self.Y_train, epochs=self.epohs,
                            validation_split=0.2,
                            batch_size=16, shuffle=False,
                            callbacks=[early_stop])
        return history