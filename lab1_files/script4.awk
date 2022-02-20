BEGIN {

# specify comma as the field separator
FS = ","
OFS = ","

# print the header
print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"
}

{

# for each car make grouping, print the cars with the top three scores
if(word != $3) {count=1; word = $3};
if(count <= 3) {print; count++}
}
