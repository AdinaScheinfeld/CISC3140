lab1:
	# run script to find total score for each car then sort by decreasing score and print to output1.csv
	awk -f lab1_files/script1.awk lab1_files/data_lab1/data.csv | sort -t, -k5rn > lab1_files/output1.csv

	# print ranked cars to output2.csv
	awk -f lab1_files/script2.awk lab1_files/output1.csv > lab1_files/output2.csv

	# output2 now contains the first requirement

	# print cars grouped by model to output3.csv in sorted order by ranking
	awk -f lab1_files/script3.awk lab1_files/output1.csv | sort -t, -k3,3 -k6,6 > lab1_files/output3.csv

	# print top 3 cars in each category to output4.csv
	awk -f lab1_files/script4.awk lab1_files/output3.csv > lab1_files/output4.csv

	# output4 now contains the second requirement

lab2:
	# change access permissions to allow create_database.sql to be executed
	chmod u+x lab2_files/create_database.sql

	# execute create_database.sql
	./lab2_files/create_database.sql
