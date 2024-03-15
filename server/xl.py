import pandas as pd
import numpy as np
import random
from datetime import datetime, timedelta

# Initialize the DataFrame with the first row set to 0 for all bins and with an initial date and time
initial_datetime = datetime(2004, 12, 12, 13, 21)
df = pd.DataFrame(columns=['Date', 'Time', 'Bin1', 'Bin2', 'Bin3', 'Bin4'], 
                  data=[[initial_datetime.date(), initial_datetime.time(), 0, 0, 0, 0]])

# Set a flag to monitor when all bins reach 100
all_bins_full = False

while not all_bins_full:
    # Take the last row as the current state
    last_row = df.iloc[-1].copy()
    
    # Increment the datetime randomly
    # Increase the time by a random amount between 1 to 60 minutes
    minutes_increase = random.randint(1, 60)
    new_datetime = datetime.combine(last_row['Date'], last_row['Time']) + timedelta(minutes=minutes_increase)
    
    # Make sure the time is within the 00:00 to 23:59 range
    if new_datetime.hour == 0 and new_datetime.minute == 0:
        new_datetime += timedelta(days=1)  # Increment day if it rolls over
    
    last_row['Date'] = new_datetime.date()
    last_row['Time'] = new_datetime.time()

    # Select a random bin that hasn't reached 100 yet
    bins_columns = ['Bin1', 'Bin2', 'Bin3', 'Bin4']
    available_bins = [bin for bin in bins_columns if last_row[bin] < 100]
    
    if available_bins:
        selected_bin = random.choice(available_bins)
        # Simulate the increment (ensure not exceeding 100)
        last_row[selected_bin] = min(last_row[selected_bin] + random.randint(1, 10), 100)
        # Append the updated row to the DataFrame
        df = df._append(last_row, ignore_index=True)
    else:
        # If no available bins, all bins are full
        all_bins_full = True

# Save the DataFrame to an Excel file
df.to_excel('data_with_datetime.xlsx', index=False)
