BEGIN {
FS = ","
OFS = ","
print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"
}

{
if(word != $3) {count=1; word = $3};
if(count <= 3) {print; count++}
}
