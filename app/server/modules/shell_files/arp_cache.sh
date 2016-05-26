#!/bin/bash

arpCommand=$(command -v arp)

result=$($arpCommand | awk 'BEGIN {print "["} NR>1 \
						{print "{ \"addr\": \"" $1 "\", " \
									"\"hw_type\": \"" $2 "\", " \
									"\"hw_addr.\": \"" $3 "\", " \
									"\"mask\": \"" $5 "\" }, " \
									} \
					END {print "]"}' \
			| /bin/sed 'N;$s/},/}/;P;D')

if [ -z "$result" ];  then echo {}
else echo $result
fi
