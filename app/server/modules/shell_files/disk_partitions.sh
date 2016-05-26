#!/bin/bash
result=$(/bin/df -Ph | awk 'NR>1 {print "{\"file_system\": \"" $1 "\", \"size\": \"" $2 "\", \"used\": \"" $3 "\", \"avail\": \"" $4 "\", \"used%\": \"" $5 "\", \"mounted\": \"" $6 "\"},"}')

echo [ ${result%?} ]