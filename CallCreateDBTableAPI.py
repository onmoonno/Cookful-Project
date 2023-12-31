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
    formatted_name = formatted_name.str.translate(
        str.maketrans('', '', punctuation))
    # Remove leading white spaces
    formatted_name = formatted_name.str.lstrip()
    return formatted_name


def map_country_to_cuisine(country):
    """Function to map country to cuisine type

    :param country:
    :return: 'other' if not mention in the mapping
    """
    # Define the cuisine type mapping inside the function
    cuisine_mapping = {
        'African Cuisine': ["Egypt", "Morocco", "Nigeria", "South Africa", "Ethiopia", "Senegal"],
        'Asian Cuisine': ["China", "Chinese ", "India", "Japan", "Thailand", "South Korea", "Vietnam"],
        'European Cuisine': ["French", "British", "France", "Italy", "Swedish", "Dutch", "Polish", "Eastern Europe",
                             "Greece", "Scotland", "Ukraine", "Russian", "Nordic countries", "Austrian", "Austrians",
                             "Spanish", "Swedish", "Hungarian", "Portuguese", "Scandinavian", "German", "Greek",
                             "Central Europe", "UK", "Czech", "Germany", "Belgian"],
        'North American Cuisine': ["USA", "Canada", "Mexico"],
        'South American Cuisine': ["Brazil", "Argentina", "Peru", "Chile", "Colombia", "Venezuela"],
        'Australian and Oceanian Cuisine': ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Samoa", "Tonga"]
    }

    for cuisine, countries in cuisine_mapping.items():
        if country in countries:
            return cuisine

    return 'Other'  # If not found in any mapping


# In[2]:


# read excel
df = pd.read_excel('Recipes_addimage_url.xlsx')
# make a duplicate in case original df is needed in the following steps
df1 = df
# print(df1.head(15))


# In[3]:
# data cleaning and formating:
# original dataset contains 146 rows
# drop the rows only have data in "]poiughfh", then drop the column "]poiughfh", containing 145 rows
df.dropna(subset='Receipe', inplace=True)
df.drop(columns=']poiughfh', inplace=True)

# There're some rows containing "Instruction" but the "Ingredients" are null,
# copy the "Instructions".value into "Ingredients" in these rows for further search
# drop the "Ingredients" null row, now containing 144 rows.
m = df['Ingredients'].isna() & df['Instructions'].notna()
df.loc[m, ['Ingredients']] = df.loc[m, ['Instructions']].values
df.dropna(subset='Ingredients', inplace=True)

# change the time into integer minutes:
df['Time_min'] = df['Time'].apply(convert_time_to_minutes)

# format the recipe name
df['Receipe'] = format_recipe_name(df['Receipe'])

# group the type of cuisine into 6 groups, and create a country column to hold the value
df["Type"] = df["Type of cuisine"].apply(map_country_to_cuisine)

# adjust the "Difficulty level" column
df["Difficulty level"] = df["Difficulty level"].str.lstrip()

# drop the recipes without the Image
df.dropna(subset='Image URL', inplace=True)

# remove duplicates:
df.drop_duplicates(subset=None, keep='first', inplace=True)


# In[12]:

df = df.fillna('')
num_rows = len(df)
api_url = "http://localhost:8080/api/recipes"

for index, row in df.iterrows():
    data = {
        'recName': row['Receipe'],
        'recImageUrl': row['Image URL'],
        'recResizedImageURL': row['Resized Image URL'],
        'recTime': row['Time_min'],
        'recTimeString': row['Time'],
        'recIngredients': row['Ingredients'],
        'recInstructions': row['Instructions'],
        'recCuisineType': row['Type'],
        'recDifficulty': row['Difficulty level'],
        'recCountry': row['Type of cuisine'],
    }

    if pd.notna(row['Receipe']):
        response = requests.post(api_url, json=data)
        # Process the response if needed
        print(
            f"API call for row {index + 1} - Response Status Code: {response.json()}")
    else:
        print(f"Skipped API call for row {index + 1} as Receipe is ''.")
