#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import requests


# In[2]:


#read excel
df = pd.read_excel('Recipes.xlsx')
#make a duplicate in case original df is needed in the following steps
df1=df 
#print(df1.head(15))


# In[3]:


#do some cleaning on df
m=df['Receipe'].isnull() & df['Time'].notnull()
df.loc[m, ['Receipe', 'Time']] = df.loc[m, ['Time', 'Receipe']].values  
n=df['Receipe'].isnull() & df[']poiughfh'].notnull()
df.loc[n, ['Receipe', ']poiughfh']] = df.loc[n, [']poiughfh', 'Receipe']].values

print(df.head(10))
    


# In[12]:


df = df.fillna('')
num_rows = len(df)
api_url = "http://localhost:8080/api/recipes"
#recImagesUrl='https://cook-full-recimages.s3.us-east-2.amazonaws.com/'+df.iloc[1, 1].replace(' ', '-')+'.png'
#rint(recImagesUrl)



for index, row in df.iterrows():
    data={
        #recID:
        'recName': row[1],
        'recImageUrl':'https://cook-full-recimages.s3.us-east-2.amazonaws.com/'+row[1].replace(' ', '-')+'.png',
        'recTime': row[3],
        'recIngredients': row[6],
        'recInstructions': row[7],
        
    }
    if pd.notna(row['Receipe']):
        response = requests.post(api_url, json=data)
         #Process the response if needed
        print(f"API call for row {index + 1} - Response Status Code: {response.json()}")
    else:
        print(f"Skipped API call for row {index + 1} as Receipe is ''.")
        
        


# In[ ]:




