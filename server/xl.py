import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

initial_datetime = datetime(2004, 12, 12, 13, 21)
df = pd.DataFrame(columns=['Date', 'Time', 'Bin1', 'Bin2', 'Bin3', 'Bin4', 'Alert'], 
                  data=[[initial_datetime.strftime("%d-%m-%Y"), initial_datetime.strftime("%H:%M"), 0, 0, 0, 0, 'Normal']])

all_bins_full = False

while not all_bins_full:
    last_row = df.iloc[-1].copy()
    new_datetime = datetime.strptime(last_row['Date'] + ' ' + last_row['Time'], "%d-%m-%Y %H:%M") + timedelta(minutes=random.randint(1, 60))

    last_row['Date'] = new_datetime.strftime("%d-%m-%Y")
    last_row['Time'] = new_datetime.strftime("%H:%M")

    bins_columns = ['Bin1', 'Bin2', 'Bin3', 'Bin4']
    available_bins = [bin for bin in bins_columns if last_row[bin] < 100]
    
    if available_bins:
        selected_bin = random.choice(available_bins)
        last_row[selected_bin] = min(last_row[selected_bin] + random.randint(1, 10), 100)
        last_row['Alert'] = 'Gas Detected' if random.random() > 0.8 else 'Normal'
        df = pd.concat([df, pd.DataFrame([last_row])], ignore_index=True)
    else:
        all_bins_full = True

df.to_excel('data_with_date_time_and_alert.xlsx', index=False)
