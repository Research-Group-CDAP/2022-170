import pandas as pd
import numpy as np

def import_dataframe_from_csv(csv_name):
     df = pd.read_csv(csv_name)
     return df