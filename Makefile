lab1:
	awk 'BEGIN {print "Car_ID,Year,Car_Make,Car_Model,Total_Points"}' > lab1_files/output1.csv
	awk -f lab1_files/script1.awk lab1_files/data_lab1/data.csv | sort -t, -k5rn >> lab1_files/output1.csv
	awk 'BEGIN {print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"}' > lab1_files/output2.csv
	awk -F',' 'NR>1{if(x!=$$5){i++}{x=$$5};print $$0 FS i}' lab1_files/output1.csv >> lab1_files/output2.csv
