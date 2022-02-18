BEGIN {

# specify comma as the field separator
FS = ","
OFS = ","

# print the header
print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"
}

# iterate through the rows of the input file, skipping the header row
NR>1{

# assign a rank to each row based on the row's total sum of scores
# if the sum of scores for two rows is equal, assign to them the same rank
if(x != $5) {i++}{x = $5};

# print each row of data with its assigned rank
print $0 FS i
}

