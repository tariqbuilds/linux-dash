#!/bin/bash

result=$(/bin/ps axo pid,user,pcpu,rss,vsz,comm --sort -pcpu,-rss,-vsz \
			| head -n 15 \
			| /usr/bin/awk 'BEGIN{OFS=":"} NR>1 {print "{ \"pid\": " $1 \
							", \"user\": \"" $2 "\"" \
							", \"cpu%\": " $3 \
							", \"rss\": " $4 \
							", \"vsz\": " $5 \
							", \"cmd\": \"" $6 "\"" "},"\
						}')

echo "[" ${result%?} "]"