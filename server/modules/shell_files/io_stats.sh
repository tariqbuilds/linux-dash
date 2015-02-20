#!/bin/bash
result=$(/bin/cat /proc/diskstats | /usr/bin/awk \
				'{ if($4==0 && $8==0 && $12==0 && $13==0) next } \
				{print "{ \"device\": \"" $3 "\", \"reads\": \""$4"\", \"writes\": \"" $8 "\", \"in_progress\": \"" $12 "\", \"time_in_io\": \"" $13 "\"},"}'
		)

echo [ ${result%?} ]