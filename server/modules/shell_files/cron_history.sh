#!/bin/bash

grepCmd=$(which grep)
cronLog='/var/log/syslog'
numberOfLines='50'

# Month, Day, Time, Hostname, tag, user,

result=$($grepCmd -m$numberOfLines CRON $cronLog \
	| awk '{ s = ""; for (i = 6; i <= NF; i++) s = s $i " "; \
			print "{\"time\" : \"" $1" "$2" "$3 "\"," \
					"\"user\" : \"" $6 "\"," \
					"\"message\" : \"" $5" "s "\"" \
				"},"
			}'
	)

echo [${result%?}]