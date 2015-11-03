#!/bin/bash

freeCmd=`which free`
awkCmd=`which awk`

procps=$($freeCmd -V | /bin/grep procps-ng)
procpsVersion=$($freeCmd -V | awk '{ print $4 }')

echo $procpsVersion

if [ -z "$procps" ]; then
	$freeCmd -tmo | $awkCmd 'NR==2 {print "{ \"total\": " $2 ", \"used\": " $3-$6-$7 ", \"free\": " $4+$6+$7 " }"}'
elif [[ "$procpsVersion" == "3.3.9"* ]]; then
	echo "yo homie";
else
	$freeCmd -tm | $awkCmd 'NR==2 {print "{ \"total\": " $2 ", \"used\": " $3-$6-$7 ", \"free\": " $4+$6+$7 " }"}'
fi
