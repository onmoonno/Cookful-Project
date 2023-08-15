#!/usr/bin/env python
# coding: utf-8

# In[33]:


import os
import pandas as pd
from PIL import Image
from io import BytesIO
import requests
import base64


# In[34]:


#load excel file
df = pd.read_excel('newRecipes.xlsx')#在这里我把新给的带图片的excel命名成'newRecipes.xlsx'；





# In[ ]:




    
        


# In[ ]:





# In[35]:


import openpyxl
from openpyxl_image_loader import SheetImageLoader


# In[36]:


pxl_doc = openpyxl.load_workbook('newRecipes.xlsx')
sheet = pxl_doc['Sheet1']
image_loader = SheetImageLoader(sheet)
row_number=df.shape[0]

for i in range(2, row_number+2):
    try:
        image = image_loader.get(f'C{i}')
        #image.show()
        image_path = '/Users/xiaoousong/Desktop/cookful recipe pictures'
        image_name = df.loc[i-2,'Receipe'].replace(' ', '-')
        image.save(f'{image_path}/{image_name}.png')
    except:
        print(f'c{i} does not contain an image')
   


# In[37]:


import boto
from boto.s3.key import Key
import boto.s3
import sys
from botocore.exceptions import NoCredentialsError
import boto3


# In[ ]:





# In[39]:


aws_access_key = 'AKIA3N7A62GFV3EEKIQS'
aws_secret_key = '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'
s3 = boto3.client('s3', aws_access_key_id=aws_access_key, aws_secret_access_key=aws_secret_key)
local_folder = '/Users/xiaoousong/Desktop/cookful recipe pictures'
bucket_name = 'cook-full-recimages'
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


# In[ ]:





# In[ ]:





# In[ ]:




