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

# original dataset contains 146 rows
# drop the rows only have data in "]poiughfh", then drop the column "]poiughfh", containing 145 rows
df.dropna(subset='Receipe', inplace=True)
df.drop(columns="]poiughfh", inplace=True)

# There're some rows containing "Instruction" but the "Ingredients" are null,
# copy the "Instructions".value into "Ingredients" in these rows for further search
# drop the "Ingredients" null row, now containing 144 rows.
m = df['Ingredients'].isna() & df['Instructions'].notna()
df.loc[m, ["Ingredients"]] = df.loc[m, ["Instructions"]].values
df.dropna(subset="Ingredients", inplace=True)




    


# In[12]:


df = df.fillna('')
num_rows = len(df)
api_url = "http://localhost:8080/api/recipes"
#recImagesUrl='https://cook-full-recimages.s3.us-east-2.amazonaws.com/'+df.iloc[1, 1].replace(' ', '-')+'.png'
#rint(recImagesUrl)



for index, row in df.iterrows():
    data={
        #recID:
        'recName': row[0],
        'recImageUrl':'https://cook-full-recimages.s3.us-east-2.amazonaws.com/'+row[1].replace(' ', '-')+'.png',
        'recTime': row[2],
        'recIngredients': row[3],
        'recInstructions': row[4],
        
    }
    if pd.notna(row['Receipe']):
        response = requests.post(api_url, json=data)
        if response.status_code == 200:
            try:
                response_data = response.json()
                print(f"API call for row {index + 1} - Response Data: {response_data}")
            except requests.exceptions.JSONDecodeError:
                print(f"API call for row {index + 1} - Response is not valid JSON.")
        else:
            print(f"API call for row {index + 1} - Response Status Code: {response.status_code}")
    else:
        print(f"Skipped API call for row {index + 1} as Receipe is ''.")


# In[ ]:




