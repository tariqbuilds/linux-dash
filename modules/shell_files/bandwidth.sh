#!/bin/bash
/bin/cat /proc/net/dev \
| awk 'BEGIN {print "["} NR>2 {print "{ \"interface\": \"" $1 "\"," \
					" \"tx\": " $2 "," \
					" \"rx\": " $10 " }," } END {print "]"}' \
| /bin/sed 'N;$s/,\n/\n/;P;D'
