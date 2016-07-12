#!/bin/bash

files=(/sys/class/net/*)
pos=$(( ${#files[*]} - 1 ))
last=${files[$pos]}
in1=()

json_output="{"

for interface in "${files[@]}"
do
	basename=$(basename "$interface")

	# find the number of bytes transfered for this interface
	in1+=( $(cat /sys/class/net/"$basename"/statistics/rx_bytes) )
done

# wait a moment
sleep 0.5

for interface in "${files[@]}"
do
	basename=$(basename "$interface")
	# check same interface again
	in2=$(cat /sys/class/net/"$basename"/statistics/rx_bytes)

	# read and remove first element
	in=${in1[0]}
	unset in1[0]
	in1=( "${in1[@]}" )

	# get the difference (transfer rate)
	in_bytes=$((in2 - in))

	# convert transfer rate to KB
	in_kbytes=$((in_bytes / 1024 * 2))

	# convert transfer rate to KB
	json_output="$json_output \"$basename\": $in_kbytes"

	# if it is not the last line
	if [[ ! $interface == $last ]]
	then
		# add a comma to the line (JSON formatting)
		json_output="$json_output,"
	fi
done

# close the JSON object & print to screen
echo "$json_output}"
