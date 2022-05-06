import pandas as pd
import numpy as np
import os


def import_dataframe_from_csv(csv_name):
     directory = os.getcwd() + '/app/util/' + csv_name
     df = pd.read_csv(directory)     
     return df