import os
import argparse

def create_js_files(path):
    for foldername in os.listdir(path):
        if foldername in ['Auth', 'User']:
            continue
        js_foldername = foldername
        js_newname = pluralize(js_foldername)
        js_path = os.path.join(path, js_foldername)
        if not os.path.exists(js_path):
            os.makedirs(js_path)
        for method in ['get', 'post', 'put', 'delete']:
            method_file = os.path.join(js_path, js_newname + '.' + method + '.js')
            with open(method_file, 'w') as f:
                f.write('const express = require("express");\n\n\nconst router = express.Router();\n\nmodule.exports = router;')
        root_file = os.path.join(js_path, js_newname + '.root.js')
        with open(root_file, 'w') as f:
            f.write(f"const express = require('express');\n\nconst deleteRoute = require('./{js_newname}/{js_newname}.delete');\nconst getRoute = require('./{js_newname}/{js_newname}.get');\nconst postRoute = require('./{js_newname}/{js_newname}.post');\nconst putRoute = require('./{js_newname}/{js_newname}.put');\n\nconst router = express.Router();\n\n// import routes\nrouter.use('/', deleteRoute);\nrouter.use('/', getRoute);\nrouter.use('/', postRoute);\nrouter.use('/', putRoute);\n\n\nmodule.exports = router;")
        print(f"Javascript files created for {foldername}.")

        
def pluralize(word):
    if word[-1] == 'y':
        return word[:-1] + 'ies'
    else:
        return word + 's'


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create Javascript files for folders.')
    parser.add_argument('path', type=str, help='Path to look for folders')
    args = parser.parse_args()
    create_js_files(args.path)
