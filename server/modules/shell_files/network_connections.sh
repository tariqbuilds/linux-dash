#!/bin/bash
netstatCmd=`which netstat`
awkCmd=`which awk`
sortCmd=`which sort`
uniqCmd=`which uniq`
sedCmd=`which sed`

$netstatCmd -ntu \
| $awkCmd 'NR>2 {print $5}' \
| $sortCmd \
| $uniqCmd -c \
| $awkCmd 'BEGIN {print "["} {print "{ \"connections\": " $1 ", \"address\": \"" $2 "\" }," } END {print "]"}' \
| $sedCmd 'N;$s/},/}/;P;D'
