#!/bin/bash
# http://askubuntu.com/questions/413367/ping-multiple-ips-using-bash

# get absolute path to config file
SCRIPTPATH=`dirname $(readlink -f $0)`
CONFIG_PATH=$SCRIPTPATH"/../config/ping_hosts"

catCmd=`which cat`
pingCmd=`which ping`
awkCmd=`which awk`
sedCmd=`which sed`
numOfLinesInConfig=`$sedCmd -n '$=' $CONFIG_PATH`
result='['

{ $catCmd $CONFIG_PATH; echo; } \
|  while read output
	do
	   	singlePing=$($pingCmd -qc 2 $output \
	    | $awkCmd -F/ 'BEGIN { endLine="}," } /^rtt/ { if ('$numOfLinesInConfig'==1){endLine="}"} print "{" "\"host\": \"'$output'\", \"ping\": " $5 " " endLine }' \
	    )
	    numOfLinesInConfig=$(($numOfLinesInConfig-1))
	    result=$result$singlePing
		if [ $numOfLinesInConfig -eq 1 ]
			then
				echo $result"]"
		fi
	done \
| $sedCmd 's/\},]/}]/g'
