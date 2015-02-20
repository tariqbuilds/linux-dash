#!/bin/bash
result=$(/usr/bin/lastlog -t 365 \
			| /usr/bin/awk 'NR>1 {\
				print "{ \
					\"user\": \"" $1 "\", \
					\"ip\": \"" $3 "\","" \
					\"date\": \"" $5" "$6" "$7" "$8" "$9 "\"},"
				}'
		)
echo [ ${result%?} ]