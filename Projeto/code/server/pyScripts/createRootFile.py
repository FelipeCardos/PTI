import os
import argparse

def create_root_file(directory):
    with open(os.path.join(directory, 'rootFile.js'), 'w') as f:
        f.write("const express = require('express');\n")
        for subdir in os.listdir(directory):
            if os.path.isdir(os.path.join(directory, subdir)):
                plural_subdir = pluralize(subdir)
                root_file = os.path.join(directory, subdir, f"{plural_subdir}.root.js")
                if os.path.isfile(root_file):
                    f.write(f"const {subdir.capitalize()} = require('./{subdir}/{plural_subdir}.root');\n")
                    f.write(f"router.use('/{plural_subdir.lower()}', {subdir.capitalize()});\n")
        f.write("\nmodule.exports = router;")
    print(f"Root file created in directory {directory}.")

def pluralize(word):
    if word[-1] == 'y':
        return word[:-1] + 'ies'
    else:
        return word + 's'

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Create a root file for a directory.')
    parser.add_argument('directory', type=str, help='Directory to look for subdirectories')
    args = parser.parse_args()
    create_root_file(args.directory)
