#!/bin/bash
result=$(/bin/ps axo pid,user,pmem,rss,vsz,comm --sort -pmem,-rss,-vsz \
			| head -n 15 \
			| /usr/bin/awk 'NR>1 {print "{ \"pid\": " $1 \
										", \"user\": \"" $2 \
										"\", \"mem_per\": " $3 \
										", \"rss\": " $4 \
										", \"vsz\": " $5 \
										", \"command\": \"" $6 \
										"\"},"}')

echo [ ${result%?} ]