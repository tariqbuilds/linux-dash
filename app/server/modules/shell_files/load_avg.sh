#!/bin/bash

grepCmd=`which grep`
awkCmd=`which awk`
catCmd=`which cat`

numberOfCores=$($grepCmd -c 'processor' /proc/cpuinfo)

if [ $numberOfCores -eq 0 ]; then
	numberOfCores=1
fi

result=$($catCmd /proc/loadavg | $awkCmd '{print "{ \"1_min_avg\": " ($1*100)/'$numberOfCores' ", \"5_min_avg\": " ($2*100)/'$numberOfCores' ", \"15_min_avg\": " ($3*100)/'$numberOfCores' "}," }')

echo ${result%?}
