import csv

input_file = 'csvjson.csv'
output_file = 'modified_recipes.csv'

with open(input_file, 'r', newline='') as csv_input, open(output_file, 'w', newline='') as csv_output:
    reader = csv.reader(csv_input)
    writer = csv.writer(csv_output, quoting=csv.QUOTE_ALL, escapechar='\\', doublequote=True)

    for row in reader:
        modified_row = [field.replace('"', '\\"') if field else '' for field in row]
        writer.writerow(modified_row)
