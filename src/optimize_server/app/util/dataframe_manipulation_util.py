import pandas as pd
from datetime import datetime

def change_timestamp_to_dateTime_and_sort(dataframe,dateTime_col_name,timestamp_col_name):
    dataframe[dateTime_col_name] = [datetime.fromtimestamp(x) for x in dataframe[timestamp_col_name]]
    dataframe = dataframe.sort_values('dateTime')
    dataframe = dataframe.set_index('dateTime')
    return dataframe

def drop_column(dataframe, rem_column_name):
   return dataframe.drop(rem_column_name,axis=1) 
        

def interpolate_missing_values(dataframe):
    for col in dataframe.columns:
        if col == 'timestamp' or col == 'dateTime':
            continue
        print("Total num of missing values:") 
        print(dataframe[col].isna().sum())
        print('')

        if dataframe[col].isna().sum() > 0 :
            # Locate the missing value
            df_missing_date = dataframe.loc[dataframe[col].isna() == True]
            # Replcase missing value with interpolation
            dataframe[col].interpolate(inplace = True)
            dataframe.fillna(method ='pad')

    return dataframe

