BEGIN {

# specify comma as the field separator
FS = ","
OFS = ","
}

# iterate through the rows of the input file, skipping the header
NR>1{

# calculate the sum of the scores in each row
for(i=8; i<=NF; i++){
	total +=$i;
}

# print the car id, year, car make, car model, and total score for each car
print $7","$4","$5","$6","total;

# reset the total to 0 to be used for the next row of data
total = 0;
}

