from ..util.file_manipulation_util import import_dataframe_from_csv,export_dataframe_to_csv,np_arr_to_df
from ..util.dataframe_manipulation_util import change_timestamp_to_dateTime_and_sort ,drop_column,interpolate_missing_values
from ..util.data_preprocess_util import split_test_and_train,scale_data_using_minmax_scaler,create_dataset,inverse_scale_data
from ..util.graph_plot_util import timeseries,plot_loss,plot_multi_step
from ..prediction_models import Bidirectional_LSTM_model,GRU_model
import io



async def return_pods_start():
    df = await data_load_cpu()
    buf = io.StringIO()
    buf2 = io.StringIO()
    df.info(buf=buf)
    b_pod_info = buf.getvalue()
    return {"pod info":b_pod_info}

async def history_cpu_start():
    df = await data_load_cpu()
    await generate_cpu_utilization_graphs(df)
    return {"status":"history plots complete"}

async def make_pod_predictions_start(pod_name:str):
    df = await data_load_cpu()
    df = await preprocess_cpu_utilization_dataset(df)
    dataframe = df[[pod_name]]
    train_data, test_data = split_test_and_train(dataframe, 0.6)
    train_scaled , test_scaled , scaler = scale_data_using_minmax_scaler(train_data, test_data)
    LOOK_BACK = 30
    X_train, y_train = create_dataset(train_scaled,LOOK_BACK)
    X_test, y_test = create_dataset(test_scaled,LOOK_BACK)
    model_bilstm_obj = Bidirectional_LSTM_model(64,X_train,y_train,100,16)
    model_gru_obj = GRU_model(64,X_train,y_train,100,16)
    model_bilstm = model_bilstm_obj.build_model()
    model_gru = model_gru_obj.build_model()
    history_BiLSTM,model_bilstm = await model_bilstm_obj.fit_model(model_bilstm)
    history_GRU,model_gru = await model_gru_obj.fit_model(model_gru)

    plot_loss (history_GRU, 'GRU','cpu')
    plot_loss (history_BiLSTM, 'Bidirectional LSTM','cpu')   

    y_test = inverse_scale_data(scaler,y_test)
    y_train = inverse_scale_data(scaler,y_train)

    prediction_bilstm = model_bilstm_obj.predict(model_gru,X_test,scaler)
    prediction_gru = model_gru_obj.predict(model_bilstm,X_test,scaler)

    def prediction(model):
        prediction = model.predict(X_train)
        prediction = scaler.inverse_transform(prediction)
        return prediction
    
    prediction_gru = prediction(model_gru)
    prediction_bilstm = prediction(model_bilstm)
    
    await export_predictions_dependecy(prediction_bilstm,'bilstm')
    await export_predictions_dependecy(prediction_gru,'gru')

    plot_multi_step(train_data,prediction_gru,prediction_bilstm,'cpu')
    return []

async def data_load_cpu():
    df = import_dataframe_from_csv('cpu2.csv')
    df = change_timestamp_to_dateTime_and_sort(df,'dateTime','timestamp')
    # df = drop_column(df,'Unnamed: 32')
    return df

async def generate_cpu_utilization_graphs(dataframe):
    df = dataframe
    for col in df.columns:
        if col == 'timestamp':
            continue
        timeseries(df.index, df[col], 'index',col,'cpu')

async def preprocess_cpu_utilization_dataset(dataframe):
    df = interpolate_missing_values(dataframe)
    return df

async def export_predictions_dependecy(np_array,model_name):
    df = np_arr_to_df(np_array)
    export_dataframe_to_csv(df,'cpu',model_name)
