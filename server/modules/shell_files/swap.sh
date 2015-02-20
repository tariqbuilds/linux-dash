#!/bin/bash
result=$(/bin/cat /proc/swaps \
			| /usr/bin/awk 'NR>1 {print "{ \"filename\": \"" $1"\", \"type\": \""$2"\", \"size\": \""$3"\", \"used\": \""$4"\", \"priority\": \""$5"\"}," }'
		)
echo [ ${result%?} ]