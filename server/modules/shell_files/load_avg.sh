#!/bin/bash
numberOfCores=$(/bin/grep -c 'model name' /proc/cpuinfo)

if [ $numberOfCores -eq 0 ]; then
	numberOfCores=1
fi

result=$(/bin/cat /proc/loadavg | /usr/bin/awk '{print "{ \"1_min_avg\": " ($1*100)/'$numberOfCores' ", \"5_min_avg\": " ($2*100)/'$numberOfCores' ", \"15_min_avg\": " ($3*100)/'$numberOfCores' "}," }')

echo ${result%?}