#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import openpyxl
from openpyxl_image_loader import SheetImageLoader

# Load Excel file and DataFrame
df = pd.read_excel('Recipes.xlsx')

# Load the workbook and sheet
pxl_doc = openpyxl.load_workbook('Recipes.xlsx', data_only=True)  # Use data_only=True to load cell values, not formulas
sheet = pxl_doc['Sheet1']

# Create an image loader for the sheet
image_loader = SheetImageLoader(sheet)

# Iterate through rows to get images
row_number = df.shape[0]

for i in range(2, row_number + 2):
    try:
        cell_reference = f'C{i}'  # Assuming 'Images' are in column C
        image = image_loader.get(cell_reference)
        if image is not None:
            image_path = '/Users/yunxiazhang/Downloads/Courses/FSE/Cookfull/Cookful-Project/Cookfull_Images'
            image_name = df.loc[i - 2, 'PhotoID']
            image.save(f'{image_path}/{image_name}.png')
        else:
            print(f'{cell_reference} does not contain an image')
    except Exception as e:
        print(f'Error processing {cell_reference}: {str(e)}')





# In[37]:
from botocore.exceptions import NoCredentialsError
import boto3
import os

# In[ ]:





# In[39]:

s3 = boto3.client('s3')
local_folder = '/Users/yunxiazhang/Downloads/Courses/FSE/Cookfull/Cookful-Project/Cookfull_Images'
bucket_name = 'cookfull-image'
for root, dirs, files in os.walk(local_folder):
    for file in files:
        local_path = os.path.join(root, file)
        s3_path = os.path.relpath(local_path, local_folder)

        try:
            s3.upload_file(local_path, bucket_name, s3_path)
            print(f'Successfully uploaded: {s3_path}')
        except FileNotFoundError:
            print(f'File not found: {local_path}')
        except NoCredentialsError:
            print('AWS credentials not available')

print('All images uploaded to S3.')






