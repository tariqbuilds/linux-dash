#!/bin/bash
/bin/cat /proc/meminfo \
	| /usr/bin/awk -F: 'BEGIN {print "{"} {print "\"" $1 "\": \"" $2 "\"," } END {print "}"}' \
	| /bin/sed 'N;$s/,\n/\n/;P;D'
