#!/bin/bash

function displaytime {
  local T=$1
  local D=$((T/60/60/24))
  local H=$((T/60/60%24))
  local M=$((T/60%60))
  local S=$((T%60))
  [[ $D > 0 ]] && printf '%d days ' $D
  [[ $H > 0 ]] && printf '%d hours ' $H
  [[ $M > 0 ]] && printf '%d minutes ' $M
  [[ $D > 0 || $H > 0 || $M > 0 ]] && printf 'and '
  printf '%d seconds\n' $S
}

os=$(/usr/bin/lsb_release -ds;/bin/uname -r | sed -e 's/^"//'  -e 's/"$//')
hostname=$(/bin/hostname)
uptime_seconds=$(/bin/cat /proc/uptime | awk '{print $1}')
server_time=$(date)

echo { \
		\"OS\": \"$os\", \
		\"Hostname\": \"$hostname\", \
		\"Uptime\": \" $(displaytime ${uptime_seconds%.*}) \", \
		\"Server Time\": \"$server_time\" \
	}