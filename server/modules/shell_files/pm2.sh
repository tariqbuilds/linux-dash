#!/bin/bash

#get data
command="pm2 list"
data="$($command)"

#only process data if variable has a length 
#this should handle cases where pm2 is not installed
if [ -n "$data" ]; then
	
	#start processing data on line 4
	#don't process last 2 lines
	json=$( echo "$data" | tail -n +4 | head -n +2 \
	| awk 	'{print "{"}\
		{print "\"appName\":\"" $2 "\","} \
		{print "\"id\":\"" $4 "\","} \
		{print "\"mode\":\"" $6 "\","} \
		{print "\"pid\":\"" $8 "\","}\
		{print "\"status\":\"" $10 "\","}\
		{print "\"restart\":\"" $12 "\","}\
		{print "\"uptime\":\"" $14 "\","}\
		{print "\"memory\":\"" $16 $17 "\","}\
		{print "\"watching\":\"" $19 "\""}\
		{print "},"}')
	#make sure to remove last comma and print in array
	echo "[" ${json%?} "]"
else
	#no data found
	echo "{}"
fi


