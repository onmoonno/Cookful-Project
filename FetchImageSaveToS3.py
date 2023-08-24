#!/usr/bin/env python
# coding: utf-8
import pandas as pd
import openpyxl
from openpyxl_image_loader import SheetImageLoader

# Load Excel file and DataFrame
df = pd.read_excel('Recipes.xlsx')
df['Image URL'] = ""

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
            image_name = i - 1
            image.save(f'{image_path}/{image_name}.png')
           
            # Store the image url
            df.loc[i - 2, 'Image URL'] = f"https://cookfull-image.s3.us-west-1.amazonaws.com/{i - 1}.png"
        else:
            print(f'{cell_reference} does not contain an image')
    except Exception as e:
        print(f'Error processing {cell_reference}: {str(e)}')

df.to_excel('Recipes_addimage_url.xlsx')





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






