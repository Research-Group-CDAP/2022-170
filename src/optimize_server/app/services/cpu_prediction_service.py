from ..util.file_manipulation_util import import_dataframe_from_csv
from ..util.dataframe_manipulation_util import change_timestamp_to_dateTime_and_sort ,drop_column
from ..util.graph_plot_util import timeseries
def prediction_start():   
    return {"titile":"Hello"}

def data_load_cpu():
    df = import_dataframe_from_csv('./cpu.csv')
    df = change_timestamp_to_dateTime_and_sort(df,'dateTime','timestamp')
    df = drop_column(df,'Unnamed: 32')
    return df

def generate_cpu_utilization_graphs():
    df = data_load_cpu()
    for col in df.columns:
        if col == 'timestamp':
            continue
        timeseries(df.index, df[col], 'index')
    return []