#!/usr/bin/env python
# coding: utf-8

# In[1]:


import pandas as pd
import requests
import string


def convert_time_to_minutes(rec_time):
    """
    the data in "Time" column is string type such as "20 min" or "1.5 hours",
    convert the data into float type with a uniform scale of minute,
    for further filter comparation.
    :param rec_time: string
    :return: minute: float
    """
    # Check if the value is a valid string or NaN (float)
    if pd.isna(rec_time):
        return 0

    rec_time_list = rec_time.split(" ")
    if rec_time_list[1] == "min":
        return float(rec_time_list[0])
    else:
        return float(rec_time_list[0]) * 60


def format_recipe_name(name):
    """
       delete any exist bracket or colons in the recipe name,
       and format the name with title.
       :param name:
       :return:
       """
    formatted_name = name.str.title()
    # Define a set of punctuation characters and remove them
    punctuation = string.punctuation
    formatted_name = formatted_name.str.translate(str.maketrans('', '', punctuation))
    # Remove leading white spaces
    formatted_name = formatted_name.str.lstrip()
    return formatted_name

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

# change the time into integer minutes:
df["Time_min"] = df["Time"].apply(convert_time_to_minutes)
print(df["Type of cuisine"].unique())
    
# format the recipe name
df["Receipe"] = format_recipe_name(df["Receipe"])

# print(df["Receipe"])

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
        'recTime': row[9],
        'recIngredients': row[6],
        'recInstructions': row[7],

    }
    if pd.notna(row['Receipe']):
        response = requests.post(api_url, json=data)
         #Process the response if needed
        print(f"API call for row {index + 1} - Response Status Code: {response.json()}")
    else:
        print(f"Skipped API call for row {index + 1} as Receipe is ''.")







