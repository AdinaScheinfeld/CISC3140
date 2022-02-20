BEGIN {

# specify comma as the field separator
FS = ","
OFS = ","
}

# iterate through the rows of the input file, skipping the first line
NR>1 {

# assign a rank to each row based on the row's total sum of scores
# if the sum of scores for two rows is equal, assign to them the same score
if(x != $5) {i++}{x=$5};

# print each row of data with its assigned rank
print $0 FS i
}
