#!/bin/bash

result=""
containers="$(docker ps | awk '{if(NR>1) print $NF}')"
for i in $containers; do
result="$result $(/usr/bin/docker top $i axo pid,user,pcpu,pmem,comm --sort -pcpu,-pmem \
			| head -n 15 \
			| /usr/bin/awk -v cnt="$i" 'BEGIN{OFS=":"} NR>1 {print "{ \"cname\": \"" cnt \
							"\", \"pid\": " $1 \
							", \"user\": \"" $2 "\"" \
							", \"cpu%\": " $3 \
							", \"mem%\": " $4 \
							", \"cmd\": \"" $5 "\"" "},"\
						}')"
done

echo "[" ${result%?} "]"
