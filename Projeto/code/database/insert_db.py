import pymysql
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path ="../server/.env")

# MySQL database configuration
DB_HOST =  os.getenv("DB_HOST")
DB_PORT =  int(os.getenv("DB_PORT"))
DB_USER =  os.getenv("DB_USER")
DB_PASSWORD =  os.getenv("DB_PASSWORD")
DB_NAME =  os.getenv("DB_NAME2")
c = ""

def execute_sql_file(file_path):
    try:
        connection = pymysql.connect(host=DB_HOST, port=DB_PORT, user=DB_USER,
                                    password=DB_PASSWORD, database=DB_NAME)
        cursor = connection.cursor()

        with open(file_path, 'r') as file:
            sql_statements = file.read()
            
        sqlCommands = sql_statements.split(';')
        
        
        for command in sqlCommands:
            try:
                cursor.execute(command)
            except pymysql.Error as e:
                c = str(command)
        
        connection.commit()
        print("SQL statements executed successfully.")

    except pymysql.Error as e:
        print(f"An error occurred: {e}, {c}")

    finally:
        if connection:
            connection.close()

