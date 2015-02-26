#!/bin/bash

freeCmd=`which free`
awkCmd=`which awk`

procps=$($freeCmd -V | /bin/grep procps-ng)

if [ -z "$procps" ]; then
	$freeCmd -tmo | $awkCmd 'NR==2 {print "{ \"total\": " $2 ", \"used\": " $3-$6-$7 ", \"free\": " $4+$6+$7 " }"}'
else
	$freeCmd -tm | $awkCmd 'NR==2 {print "{ \"total\": " $2 ", \"used\": " $3-$6-$7 ", \"free\": " $4+$6+$7 " }"}'
fi
