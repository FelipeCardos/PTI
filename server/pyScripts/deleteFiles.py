import os

# Define the directory to search for JavaScript files
dir_path = "C:/Users/berna/OneDrive/Documents/Code/NODEJS/localshop_backend/src/routes/api/v1"

# Define a list of folder names to exclude
exclude_folders = ["User", "Auth"]

# Loop through all files in the directory and delete JavaScript files
for root, dirs, files in os.walk(dir_path):
    # Check if the current folder should be excluded
    if os.path.basename(root) in exclude_folders:
        continue
    
    for file in files:
        # Check if the file is a JavaScript file
        if file.endswith(".js"):
            # Delete the file
            os.remove(os.path.join(root, file))
