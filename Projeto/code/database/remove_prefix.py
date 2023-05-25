def remove_lines_with_prefix(input_file, output_file, prefixes):
    with open(input_file, 'r') as file:
        lines = file.readlines()

    filtered_lines = [line for line in lines if not line.lstrip().startswith(tuple(prefixes))]

    with open(output_file, 'w') as file:
        file.writelines(filtered_lines)



