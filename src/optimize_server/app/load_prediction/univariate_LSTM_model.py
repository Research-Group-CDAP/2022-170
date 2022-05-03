import tensorflow as tf

class univariate_LSTM_model():
    def __init__(self, time_steps, features, epochs, generator):
        self.time_steps = time_steps
        self.features = features
        self.epochs = epochs
        self.generator = generator
    
    def model_build(self):
        model = tf.keras.models.Sequential()
        model.add(tf.keras.layers.LSTM(
            units=32,
            activation='relu',
            input_shape=(self.time_steps, self.features)
        ))
        model.add(tf.keras.layers.Dense(units=16))
        model.add(tf.keras.layers.Dropout(0.2))
        model.add(tf.keras.layers.Dense(units=1))
        model.compile(
            loss='mean_squared_error',
            optimizer=tf.keras.optimizers.Adam(0.001),
            metrics=['mae', 'mse']
        )
        history = model.fit(self.generator, epochs=self.epochs, verbose=1,callbacks=[early_stopping_callback])
        return model