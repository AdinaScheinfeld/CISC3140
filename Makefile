lab1:
	# run script to find total score for each car then sort by decreasing score
	awk -f lab1_files/script1.awk lab1_files/data_lab1/data.csv | sort -t, -k5rn > lab1_files/output1.csv

	# print header to output file
	awk  'BEGIN {print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"}' > lab1_files/output2.csv

	# print ranked cars to output file
	awk -F',' 'NR>1{if(x!=$$5){i++}{x=$$5};print $$0 FS i}' lab1_files/output1.csv >> lab1_files/output2.csv

	# output2 now contains the first requirement

	# print cars and rankings to output file
	awk -F',' 'NR>1{if(x!=$$5){i++}{x=$$5};print $$0 FS i}' lab1_files/output1.csv > lab1_files/output3.csv

	# print heading to output file
	awk  'BEGIN {print "Car_ID,Year,Car_Make,Car_Model,Total_Points,Ranking"}' > lab1_files/output4.csv

	# sort by model and ranking and get top 3 in each category
	sort -t, -k3,3 -k6,6n lab1_files/output3.csv | awk -F, 'word!=$$3{count=1;word=$$3} count<=3{print; count++}' >> lab1_files/output4.csv

	# output4 now contains the second requirement
