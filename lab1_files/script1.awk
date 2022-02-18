BEGIN {
# specify comma as the field separator
FS = ","
OFS = ","
# print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"
}

NR>1{
for(i=8; i<=NF; i++){
	total +=$i;
}
# $(NF+1) = total;
print $7","$4","$5","$6","total;
total = 0;
}

