# Lab 1

AWK scripts to calculate various metrics on car data.

## Description
Given a CSV file containing data points related to a number of cars:
- Across all cars, compute the total for each row and add as a new column. Present the list in descending order using the total column, and add a new ranking column.
- For each car make grouping, list the top 3 cars.


## Report Contents

### Input file

- [data.csv](data_lab1/data.csv): Input file containing various metrics on cars including timestamps, the email address of the owner of  each car, the name of the owner of each car, the year of each car, the make of each car, the model of each car, the ID of each car, and scores for each car's racer turbo, racer supercharged, racer performance, racer horsepower, car overall, engine modification, engine performance, engine chrome, engine detailing, engine cleanliness, body frame undercarriage, body frame suspension, body frame chrome, body frame detailing, body frame cleanliness, mods paint, mods body, mods wrap, mods rims, mods interior, mods other mods ICE, mods aftermarket, mods WIP, and mods overall. The latest version of this data was obtained from [this repo](https://gist.github.com/d66a59b6db4e59c16efd4c42ad411f8e.git) and addded to this projects github repository as a submodule. 

### Scripts

- [script1.awk](script1.awk): An AWK script that iterates through the input file and prints the total score for each car to an output file.
- [script2.awk](script2.awk): An AWK script that iterates through the output file prepared by [script1.awk](script1.awk), assigns a rank to each row based on the row's total sum of scores, and prints the output to an output file.
- [script3.awk](script3.awk): An AWK script that iterates through the output file prepared by [script1.awk](script1.awk), assigns a rank to each row based on the row's total sum of scores, and prints the output to an output file. 
- [script4.awk](script4.awk): An AWK script that prints the cars with the top three scores for each car make grouping.

### Output files
- [output2.csv](output2.csv): A CSV file containing the Car ID, Year, Car Make, Car Model, Total Points, and Ranking for each car, presented in descending order by total points.
- [output4.csv](output4.csv): A CSV file containing the Car ID, Year, Car Make, Car Model, Total Points, and Ranking for the top three cars of each car make grouping. 
- [output1.csv](output1.csv) and [output3.csv](output3.csv): Temporary CSV files used to produce [output2.csv](output2.csv) and [output4.csv](output4.csv), respectively. 

## Getting Started

### Dependencies

The project was build using VIM text editor with a remote connection to the Brooklyn CCollege linux machines.

### Executing program
All scripts will run using the command ```make lab1``` from the root of the project repository.


