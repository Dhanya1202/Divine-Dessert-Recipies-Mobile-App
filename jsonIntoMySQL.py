import json
import mysql.connector

# Read the JSON file
with open('C:/Users/kavit/DivineDessert/assets/recipesData.json' , 'r',encoding='utf-8') as file:
    data = json.load(file)

# Database connection configuration
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': 'kishoremyna',
    'database': 'DessertDB'
}

# Function to insert data into the MySQL database
def insert_data():
    try:
        # Establish a connection to the database
        connection = mysql.connector.connect(**db_config)
        cursor = connection.cursor()

        # Iterate over the JSON data and insert it into the database
        for item in data:
            sql = '''INSERT INTO recipes (Srno, RecipeName, Ingredients, PrepTimeInMins, CookTimeInMins, TotalTimeInMins, Servings, Cuisine, Diet, ImageUrl, Instructions, URL) 
                     VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)'''
            values = (item['Srno'], item['RecipeName'], item['Ingredients'], item['PrepTimeInMins'], item['CookTimeInMins'], 
                      item['TotalTimeInMins'], item['Servings'], item['Cuisine'], item['Diet'], item['ImageUrl'], item['Instructions'], 
                      item['URL'])
            cursor.execute(sql, values)
            print(f"Inserted data for Srno {item['Srno']}")

        # Commit the transaction and close the connection
        connection.commit()
        cursor.close()
        connection.close()
        print('Data insertion completed.')
    except Exception as e:
        print('Error inserting data:', e)

# Call the insert_data function
insert_data()
