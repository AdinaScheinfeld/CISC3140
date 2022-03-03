# Data Dictionary

### Cars
|Column Name|Data Type|Required?|Primary Key?|Description|
|-----------|---------|---------|------------|-----------|
|Car_ID|INT|No|Yes|Unique ID number identifying each car
|Year|INT|No|No|Year of each car|
|Make|TEXT|No|No|Make of each car|
|Model|TEXT|No|No|Model of each car|
|Name|TEXT|No|No|Name of owner of each car|
|Email|TEXT|No|No|Email address of owner of each car|

### Judges
|Column Name|Data Type|Required?|Primary Key?|Description|
|-----------|---------|---------|------------|-----------|
|Timestamp|DATETIME|No|No|Time that a car was judged|
|Judge_ID|TEXT|No|No|Unique ID identifying each judge|
|Judge_Name|TEXT|No|No|Name of each judge|

### Car_Score
|Column Name|Data Type|Required?|Primary Key?|Description|
|-----------|---------|---------|------------|-----------|
|Car_ID|INT|No|Yes|Unique ID number identifying each car|
|Racer_Turbo|INT|No|No|Score for the racer turbo of each car|
|Racer_Supercharged|INT|No|No|Score for the racer supercharged of each car|
|Racer_Performance|INT|No|No|Score for the racer performance of each car|
|Racer_Horsepower|INT|No|No|Score for the racer horsepower of each car|
|Car_Overall|INT|No|No|Score for the car overall|
|Engine_Modifications|INT|No|No|Score for the engine modifications of each car|
|Engine_Performance|INT|No|No|Score for the engine performance of each car|
|Engine_Chrome|INT|No|No|Score for the engine chrome of each car|
|Engine_Detailing|INT|No|No|Score for the engine detailing of each car|
|Engine_Cleanliness|INT|No|No|Score for the engine cleanliness of each car|
|Body_Frame_Undercarriage|INT|No|No|Score for the body frame undercarriage of each car|
|Body_Frame_Suspension|INT|No|No|Score for the body frame suspension of each car|
|Body_Frame_Chrome|INT|No|No|Score for the body frame chrome of each car|
|Body_Frame_Detailing|INT|No|No|Score for the body frame detailing of each car|
|Body_Frame_Cleanliness|INT|No|No|Score for the body frame cleanliness of each car|
|Mods_Paint|INT|No|No|Score for the paint modification of each car|
|Mods_Body|INT|No|No|Score for the body modification of each car|
|Mods_Wrap|INT|No|No|Score for the wrap modification of each car|
|Mods_Rims|INT|No|No|Score for the rims modification of each car|
|Mods_Interior|INT|No|No|Score for the interior modification of each car|
|Mods_Other|INT|No|No|Score for the other modifications of each car|
|Mods_ICE|INT|No|No|Score for the ICE modifications of each car|
|Mods_Aftermarket|INT|No|No|Score for the aftermarket modifications of each car|
|Mods_WIP|INT|No|No|Score for the WIP modifications of each car|
|Mods_Overall|INT|No|No|Score for the overall modifications of each car|

### Rank_Table
|Column Name|Data Type|Required?|Primary Key?|Description|
|-----------|---------|---------|------------|-----------|
|Car_ID|INT|No|No|Unique ID number identifying each car|
|Year|INT|No|No|Year of each car|
|Make|TEXT|No|No|Make of each car|
|Model|TEXT|No|No|Model of each car|
|Total|INT|No|No|Total score of each car|
|Rank|INT|No|No|Rank of each car based on the total scores|

### Top_Three
|Column Name|Data Type|Required?|Primary Key?|Description|
|-----------|---------|----------|-----------|-----------|
|Car_ID|INT|No|No|Unique ID number identifying each car|
|Make|TEXT|No|No|Make of each car|
|Total|INT|No|No|Total score of each car|
|Rank|INT|No|No|Rank of each car based on the total scores|

### Updated_Judges
|Column Name|Data Type|Required?|Primary Key?|Description|
|-----------|---------|---------|------------|-----------|
|Judge_ID|TEXT|No|No|Unique ID identifying each judge|
|Judge_Name|TEXT|No|No|Name of each judge|
|Num_Cars|INT|No|No|Number of cars judged by each judge|
|Start_Timestamp|DATETIME|No|No|First timestamp of each judge''s judging for the day|
|End_Timestamp|DATETIME|No|No|Final timestamp of each judge''s judging for the day|
|Duration|INT|No|No|Duration (in hours) between start and end times for each judge|
|Average|INT|No|No|Average speed (in minutes per car) for each judge|














