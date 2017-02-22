psql^
 --username=postgres^
 --dbname VG^
 -f 04-filter-stops.sql^
 --set=stops_input="'%cd%\unfiltered-stops.txt'"^
 --set=stops_output="'%cd%\stops.txt'"^
 --set=selected_rs="'06411,06412,06414,06432,06433,06434,06435,06436,06437,06438,06439,06440,06531,06532,06533,06534,06535,06631,07315'"