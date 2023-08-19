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
df = pd.read_excel('newRecipe.xlsx')#在这里我把新给的带图片的excel命名成'newRecipes.xlsx'；





# In[ ]:




    
        


# In[ ]:





# In[35]:


import openpyxl
from openpyxl_image_loader import SheetImageLoader
from CallCreateDBTableAPI import format_recipe_name

# In[36]:

#
# pxl_doc = openpyxl.load_workbook('Recipes.xlsx')
# sheet = pxl_doc['Sheet1']
# image_loader = SheetImageLoader(sheet)
# row_number=df.shape[0]
#
# for i in range(2, row_number+2):
#     try:
#         image = image_loader.get(f'C{i}')
#         #image.show()
#         image_path = '/Users/yunxiazhang/Downloads/Courses/FSE/Cookfull/Cookful-Project/Cookfull_Images'
#         image_name = df.loc[i-2,'Receipe'].replace(' ', '-')
#         image.save(f'{image_path}/{image_name}.png')
#     except:
#         print(f'c{i} does not contain an image')
#
#


# In[37]:



from botocore.exceptions import NoCredentialsError
import boto3


# In[ ]:





# In[39]:

s3 = boto3.client('s3')
# s3.upload_file('/Users/yunxiazhang/Downloads/Courses/FSE/Cookfull/Cookful-Project/Cookfull_Images/Alternate-Recipe-For-Kotlet-Schabowy.png','cookfull-image','Alternate-Recipe-For-Kotlet-Schabowy.png')
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


# # In[ ]:
#
#
#
#
#
# # In[ ]:
#
#
#
#
#
# In[ ]:




