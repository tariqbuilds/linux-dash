#!/bin/bash

arpCommand=$(command -v arp) 

result=$($arpCommand | awk 'BEGIN {print "["} NR>1 \
						{print "{ \"address\": \"" $1 "\", " \
									"\"hw_type\": \"" $2 "\", " \
									"\"hw_address\": \"" $3 "\", " \
									"\"flags\": \"" $4 "\", " \
									"\"mask\": \"" $5 "\" }, " \
									} \
					END {print "]"}' \
			| /bin/sed 'N;$s/},/}/;P;D')

if [ -z "$result" ];  then echo {}
else echo $result
fi 