import os
import argparse
from clear_db import wipe_tables
from insert_db import execute_sql_file
from remove_prefix import remove_lines_with_prefix

output_file_path = 'data.sql'  
prefixes_to_remove = ['--', ' --', '  --']

def rundb(sqlfile, rm):
    if rm:
        print('Removing database...')
        wipe_tables()
        if sqlfile:
            remove_lines_with_prefix(sqlfile, output_file_path, prefixes_to_remove)
            print('Running SQL file...')
            execute_sql_file(output_file_path)
            os.remove(output_file_path)
        else:
            print('No SQL file specified.')
    else:
        if sqlfile:
            remove_lines_with_prefix(sqlfile, output_file_path, prefixes_to_remove)
            print('Running SQL file...')
            execute_sql_file(output_file_path)
            os.remove(output_file_path)
        else:
            print('No --sqlfile {file} or --rm specified.')
            
        
        


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--sqlfile', type=str, help='SQL file path')
    parser.add_argument('--rm', action='store_true', help='Remove flag')

    args = parser.parse_args()

    if args.rm:
        rm = True
    else:
        rm = False
        
    if args.sqlfile:
        sqlfile = args.sqlfile
    else:
        sqlfile = None
        
    rundb(sqlfile, rm)
    
    