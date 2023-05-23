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


def wipe_tables():
    try:

        connection = pymysql.connect(host=DB_HOST, port=DB_PORT, user=DB_USER,
                                    password=DB_PASSWORD, database=DB_NAME)
        cursor = connection.cursor()


        cursor.execute("SHOW TABLES")
        tables = cursor.fetchall()

        for table in tables:
            table_name = table[0]

            cursor.execute("SET FOREIGN_KEY_CHECKS=0")

            cursor.execute(f"TRUNCATE TABLE {table_name}")

            cursor.execute("SET FOREIGN_KEY_CHECKS=1")

        connection.commit()
        print("Data has been wiped from all tables.")

    except pymysql.Error as e:
        print(f"An error occurred: {e}")

    finally:

        if connection:
            connection.close()








