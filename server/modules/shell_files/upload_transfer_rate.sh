#!/bin/bash

files=(/sys/class/net/*)
pos=$(( ${#files[*]} - 1 ))
last=${files[$pos]}
out1=()

json_output="{"

for interface in "${files[@]}"
do
	basename=$(basename "$interface")

	# find the number of bytes transfered for this interface
	out1+=( $(cat /sys/class/net/"$basename"/statistics/tx_bytes) )
done

# wait a moment
sleep 0.5

for interface in "${files[@]}"
do
	basename=$(basename "$interface")

	# check same interface again
	out2=$(cat /sys/class/net/"$basename"/statistics/tx_bytes)

	# read and remove first element
	out=${out1[0]}
	unset out1[0]
	out1=( ${out1[@]} )

	# get the difference (transfer rate)
	out_bytes=$((out2 - out))

	# convert transfer rate to KB
	out_kbytes=$((out_bytes / 1024 * 2))

	# convert transfer rate to KB
	json_output="$json_output \"$basename\": $out_kbytes"

	# if it is not the last line
	if [[ ! $interface == $last ]]
	then
		# add a comma to the line (JSON formatting)
		json_output="$json_output,"
	fi
done

# close the JSON object & print to screen
echo "$json_output}"
