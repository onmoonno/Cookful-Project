#!/usr/bin/env python
# coding: utf-8

# In[10]:


import os
import pandas as pd
from PIL import Image
from io import BytesIO
import requests
import base64


# In[20]:


#load excel file
df = pd.read_excel('newRecipes.xlsx')#在这里我把新给的带图片的excel命名成'newRecipes.xlsx'；





# In[ ]:




    
        


# In[ ]:





# In[21]:


import openpyxl
from openpyxl_image_loader import SheetImageLoader


# In[25]:


pxl_doc = openpyxl.load_workbook('newRecipes.xlsx')
sheet = pxl_doc['Sheet1']
image_loader = SheetImageLoader(sheet)
row_number=df.shape[0]

for i in range(2, row_number+2):
    try:
        image = image_loader.get(f'C{i}')
        #image.show()
        image_path = '/Users/xiaoousong/Desktop/cookful recipe pictures'
        image_name = df.loc[i-2,'Receipe']#.replace(' ', '/')在这里我试图把名字里所有的空格都用/替换掉，
        #但不知道为什么这样做了以后大部分图片都搞不下来，这里的无法替换造成了后面提取图片url的麻烦，大家可以试图解决一下。
        
        image.save(f'{image_path}/{image_name}.png')
    except:
        print(f'c{i} does not contain an image')
    #另外，这里运行完以后有的图片的名字正确，有的变成了上一行或者下一行的名字，需要check原因


# In[60]:


import boto
from boto.s3.key import Key
import boto.s3
import sys
from botocore.exceptions import NoCredentialsError
import boto3


# In[ ]:





# In[61]:


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


# In[30]:


imageName=''
for i in range(len(df. index)+1):
    name=df.iloc[i+1]['Receipe']
    imageName=name.replace(' ','+')#承接上面提到的问题：因为图片名字里带有空格，上传到s3后，s3貌似把所有的空格用加号代替了，比如：
    #carrot soup的链接：https://cook-full-recimages.s3.us-east-2.amazonaws.com/carrot+soup.png
    #我在这里试图将空格替换成加号，但一直报错，报错信息： 'float' object has no attribute 'replace'
    df.iloc[i+1]['recImage']='https://cook-full-recimages.s3.us-east-2.amazonaws.com/{imageName}.png'  
print(df.head(5))
df.to_excel('newRecipes.xlsx')


# In[ ]:





# In[ ]:




