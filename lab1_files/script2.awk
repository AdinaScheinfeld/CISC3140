BEGIN {
FS = ","
OFS = ","
print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"
}

NR>1{
if(x != $5) {i++}{x = $5};
print $0 FS i
}

