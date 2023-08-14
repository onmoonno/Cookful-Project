#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import requests


# In[2]:


#read excel
df = pd.read_excel('newRecipes.xlsx')
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
    


# In[9]:


df = df.fillna('')
num_rows = len(df)
api_url = "http://localhost:8080/api/recipes"
for index, row in df.iterrows():
    data={
        #recID:
        'recName': row[1],
        'recTime': row[2],
        'recIngredients': row[3],
        'recInstructions': row[4],
    }
    if pd.notna(row['Receipe']):
        response = requests.post(api_url, json=data)
         #Process the response if needed
        print(f"API call for row {index + 1} - Response Status Code: {response.json()}")
    else:
        print(f"Skipped API call for row {index + 1} as Receipe is ''.")
        
        


# In[ ]:




