#!/bin/bash

result=$( pm2 list \
 	| tail -n +4 | head -n +2 \
 	| awk 	'{print "{"}\
		{print "\"appName\":\"" $2 "\","} \
		{print "\"id\":\"" $4 "\","} \
		{print "\"mode\":\"" $6 "\","} \
		{print "\"pid\":\"" $8 "\","}\
		{print "\"status\":\"" $10 "\","}\
		{print "\"restart\":\"" $12 "\","}\
		{print "\"uptime\":\"" $14 "\","}\
		{print "\"memory\":\"" $16 $17 "\","}\
		{print "\"watching\":\"" $19 "\""}\
		{print "},"}')

echo "[" ${result%?} "]" 
