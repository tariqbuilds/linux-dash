#!/bin/bash

_parseAndPrint() {
  while read data; do
    echo -n "$data" | sed -r "s/\"/\\\\\"/g" | tr -d "\n";
  done;
}

arp_cache() {
  arpCommand=$(command -v arp)

  result=$($arpCommand | awk 'BEGIN {print "["} NR>1 \
              {print "{ \"addr\": \"" $1 "\", " \
                    "\"hw_type\": \"" $2 "\", " \
                    "\"hw_addr.\": \"" $3 "\", " \
                    "\"mask\": \"" $5 "\" }, " \
                    } \
            END {print "]"}' \
        | /bin/sed 'N;$s/},/}/;P;D')

  if [ -z "$result" ];  then echo {}
  else echo $result | _parseAndPrint
  fi
}

bandwidth() {

  /bin/cat /proc/net/dev \
  | awk 'BEGIN {print "["} NR>2 {print "{ \"interface\": \"" $1 "\"," \
            " \"tx\": " $2 "," \
            " \"rx\": " $10 " }," } END {print "]"}' \
  | /bin/sed 'N;$s/,\n/\n/;P;D' \
  | _parseAndPrint
}

common_applications() {
  result=$(whereis php node mysql mongo vim python ruby java apache2 nginx openssl vsftpd make \
  | awk -F: '{if(length($2)==0) { installed="false"; } else { installed="true"; } \
        print \
        "{ \
          \"binary\": \""$1"\", \
          \"location\": \""$2"\", \
          \"installed\": "installed" \
        },"}')

  echo "[" ${result%?} "]" | _parseAndPrint
}

cpu_info() {

  result=$(/usr/bin/lscpu \
      | /usr/bin/awk -F: '{print "\""$1"\": \""$2"\"," }  '\
      )

  echo "{" ${result%?} "}" | _parseAndPrint
}

cpu_intensive_processes() {

  result=$(/bin/ps axo pid,user,pcpu,rss,vsz,comm --sort -pcpu,-rss,-vsz \
        | head -n 15 \
        | /usr/bin/awk 'BEGIN{OFS=":"} NR>1 {print "{ \"pid\": " $1 \
                ", \"user\": \"" $2 "\"" \
                ", \"cpu%\": " $3 \
                ", \"rss\": " $4 \
                ", \"vsz\": " $5 \
                ", \"cmd\": \"" $6 "\"" "},"\
              }')

  echo "[" ${result%?} "]" | _parseAndPrint
}

cpu_temp() {

  if [ `which sensors` ]; then
    returnString=`sensors`
    #amd
    if [[ "${returnString/"k10"}" != "${returnString}" ]] ; then
      echo ${returnString##*k10} | cut -d ' ' -f 6 | cut -c 2- | cut -c 1-4
    #intel
    elif [[ "${returnString/"core"}" != "${returnString}" ]] ; then
      fromcore=${returnString##*"coretemp"}
      echo ${fromcore##*Physical}  | cut -d ' ' -f 3 |  cut -c 2-5 | _parseAndPrint
    fi
  else
    echo "[]" | _parseAndPrint
  fi
}

# by Paul Colby (http://colby.id.au), no rights reserved ;)
cpu_utilization() {

  PREV_TOTAL=0
  PREV_IDLE=0
  iteration=0

  while [[ iteration -lt 2 ]]; do
    # Get the total CPU statistics, discarding the 'cpu ' prefix.
    CPU=(`sed -n 's/^cpu\s//p' /proc/stat`)
    IDLE=${CPU[3]} # Just the idle CPU time.

    # Calculate the total CPU time.
    TOTAL=0
    for VALUE in "${CPU[@]}"; do
      let "TOTAL=$TOTAL+$VALUE"
    done

    # Calculate the CPU usage since we last checked.
    let "DIFF_IDLE=$IDLE-$PREV_IDLE"
    let "DIFF_TOTAL=$TOTAL-$PREV_TOTAL"
    let "DIFF_USAGE=(1000*($DIFF_TOTAL-$DIFF_IDLE)/$DIFF_TOTAL+5)/10"
    #echo -en "\rCPU: $DIFF_USAGE%  \b\b"

    # Remember the total and idle CPU times for the next check.
    PREV_TOTAL="$TOTAL"
    PREV_IDLE="$IDLE"

    # Wait before checking again.
    sleep 1
    iteration="$iteration+1"
  done
  echo -en "$DIFF_USAGE"
}

cron_history() {

  grepCmd=$(which grep)
  cronLog='/var/log/syslog'
  numberOfLines='50'

  # Month, Day, Time, Hostname, tag, user,

  result=$($grepCmd -m$numberOfLines CRON $cronLog \
    | awk '{ s = ""; for (i = 6; i <= NF; i++) s = s $i " "; \
        print "{\"time\" : \"" $1" "$2" "$3 "\"," \
            "\"user\" : \"" $6 "\"," \
            "\"message\" : \"" $5" "gensub("\"", "\\\\\"", "g", s) "\"" \
          "},"
        }'
    )

  echo [${result%?}] | _parseAndPrint
}

current_ram() {

  awkCmd=`which awk`
  catCmd=`which cat`
  grepCmd=`which grep`
  memInfoFile="/proc/meminfo"

  # References:
  #   Calculations: http://zcentric.com/2012/05/29/mapping-procmeminfo-to-output-of-free-command/
  #   Fields: https://www.kernel.org/doc/Documentation/filesystems/proc.txt

  memInfo=`$catCmd $memInfoFile | $grepCmd 'MemTotal\|MemFree\|Buffers\|Cached'`

  echo $memInfo | $awkCmd '{print "{ \"total\": " ($2/1024) ", \"used\": " ( ($2-($5+$8+$11))/1024 ) ", \"available\": " (($5+$8+$11)/1024) " }"  }' | _parseAndPrint
}

disk_partitions() {

  result=$(/bin/df -Ph | awk 'NR>1 {print "{\"file_system\": \"" $1 "\", \"size\": \"" $2 "\", \"used\": \"" $3 "\", \"avail\": \"" $4 "\", \"used%\": \"" $5 "\", \"mounted\": \"" $6 "\"},"}')

  echo [ ${result%?} ] | _parseAndPrint
}

docker_processes() {

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

  echo "[" ${result%?} "]" | _parseAndPrint
}

download_transfer_rate() {

	files=(/sys/class/net/*)
	pos=$(( ${#files[*]} - 1 ))
	last=${files[$pos]}

	json_output="{"

	for interface in "${files[@]}"
	do
		basename=$(basename "$interface")

		# find the number of bytes transfered for this interface
		in1=$(cat /sys/class/net/"$basename"/statistics/rx_bytes)

		# wait a second
		sleep 1

		# check same interface again
		in2=$(cat /sys/class/net/"$basename"/statistics/rx_bytes)

		# get the difference (transfer rate)
		in_bytes=$((in2 - in1))

		# convert transfer rate to KB
		in_kbytes=$((in_bytes / 1024))

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
	echo "$json_output}" | _parseAndPrint
}

general_info() {

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

  lsbRelease=$(/usr/bin/lsb_release -ds | sed -e 's/^"//'  -e 's/"$//')
  uname=$(/bin/uname -r | sed -e 's/^"//'  -e 's/"$//')
  os=`echo $lsbRelease $uname`
  hostname=$(/bin/hostname)
  uptime_seconds=$(/bin/cat /proc/uptime | awk '{print $1}')
  server_time=$(date)

  echo "{ \"OS\": \"$os\", \"Hostname\": \"$hostname\", \"Uptime\": \" $(displaytime ${uptime_seconds%.*}) \", \"Server Time\": \"$server_time\" }" | _parseAndPrint
}

io_stats() {

  result=$(/bin/cat /proc/diskstats | /usr/bin/awk \
          '{ if($4==0 && $8==0 && $12==0 && $13==0) next } \
          {print "{ \"device\": \"" $3 "\", \"reads\": \""$4"\", \"writes\": \"" $8 "\", \"in_prog.\": \"" $12 "\", \"time\": \"" $13 "\"},"}'
      )

  echo [ ${result%?} ] | _parseAndPrint
}

ip_addresses() {

  awkCmd=`which awk`
  grepCmd=`which grep`
  sedCmd=`which sed`
  ifconfigCmd=`which ifconfig`
  trCmd=`which tr`
  digCmd=`which dig`

  externalIp=`$digCmd +short myip.opendns.com @resolver1.opendns.com`

  echo -n "["

  for item in $($ifconfigCmd | $grepCmd -oP "^[a-zA-Z0-9:]*(?=:)")
  do
      echo -n "{\"interface\" : \""$item"\", \"ip\" : \"$( $ifconfigCmd $item | $grepCmd "inet" | $awkCmd '{match($0,"inet (addr:)?([0-9.]*)",a)}END{ if (NR != 0){print a[2]; exit}{print "none"}}')\"}, "
  done

  echo "{ \"interface\": \"external\", \"ip\": \"$externalIp\" } ]" | _parseAndPrint
}

load_avg() {

  grepCmd=`which grep`
  awkCmd=`which awk`
  catCmd=`which cat`

  numberOfCores=$($grepCmd -c 'processor' /proc/cpuinfo)

  if [ $numberOfCores -eq 0 ]; then
    numberOfCores=1
  fi

  result=$($catCmd /proc/loadavg | $awkCmd '{print "{ \"1_min_avg\": " ($1*100)/'$numberOfCores' ", \"5_min_avg\": " ($2*100)/'$numberOfCores' ", \"15_min_avg\": " ($3*100)/'$numberOfCores' "}," }')

  echo ${result%?} | _parseAndPrint
}

logged_in_users() {

  result=$(COLUMNS=300 /usr/bin/w -h | /usr/bin/awk '{print "{\"user\": \"" $1 "\", \"from\": \"" $3 "\", \"when\": \"" $4 "\"},"}')

  echo [ ${result%?} ] | _parseAndPrint
}

memcached() {
  echo "stats" \
    | /bin/nc -w 1 127.0.0.1 11211 \
    | /bin/grep 'bytes' \
    | /usr/bin/awk 'BEGIN {print "{"} {print "\"" $2 "\": " $3 } END {print "}"}' \
    | /usr/bin/tr '\r' ',' \
    | /bin/sed 'N;$s/,\n/\n/;P;D' \
    | _parseAndPrint
}

memory_info() {

  /bin/cat /proc/meminfo \
    | /usr/bin/awk -F: 'BEGIN {print "{"} {print "\"" $1 "\": \"" $2 "\"," } END {print "}"}' \
    | /bin/sed 'N;$s/,\n/\n/;P;D' \
    | _parseAndPrint
}

network_connections() {

  netstatCmd=`which netstat`
  awkCmd=`which awk`
  sortCmd=`which sort`
  uniqCmd=`which uniq`
  sedCmd=`which sed`

  $netstatCmd -ntu \
  | $awkCmd 'NR>2 {print $5}' \
  | $sortCmd \
  | $uniqCmd -c \
  | $awkCmd 'BEGIN {print "["} {print "{ \"connections\": " $1 ", \"address\": \"" $2 "\" }," } END {print "]"}' \
  | $sedCmd 'N;$s/},/}/;P;D' \
  | _parseAndPrint
}

number_of_cpu_cores() {

  numberOfCPUCores=$(/bin/grep -c 'model name' /proc/cpuinfo)

  if [ length $numberOfCPUCores ]; then
    echo "cannnot be found";
  fi
}

# http://askubuntu.com/questions/413367/ping-multiple-ips-using-bash
ping() {

	# get absolute path to config file
	SCRIPTPATH=`dirname $(readlink -f $0)`
	CONFIG_PATH=$SCRIPTPATH"/config/ping_hosts"

	catCmd=`which cat`
	pingCmd=`which ping`
	awkCmd=`which awk`
	sedCmd=`which sed`
	numOfLinesInConfig=`$sedCmd -n '$=' $CONFIG_PATH`
	result='['

	$catCmd $CONFIG_PATH \
	|  while read output
		do
		   	singlePing=$($pingCmd -qc 2 $output \
		    | $awkCmd -F/ 'BEGIN { endLine="}," } /^rtt/ { if ('$numOfLinesInConfig'==1){endLine="}"} print "{" "\"host\": \"'$output'\", \"ping\": " $5 " " endLine }' \
		    )
		    numOfLinesInConfig=$(($numOfLinesInConfig-1))
		    result=$result$singlePing
			if [ $numOfLinesInConfig -eq 0 ]
				then
					echo $result"]"
			fi
		done \
	| $sedCmd 's/\},]/}]/g' \
  | _parseAndPrint
}

pm2_stats() {

	#get data
	command="pm2 list"
	data="$($command)"

	#only process data if variable has a length
	#this should handle cases where pm2 is not installed
	if [ -n "$data" ]; then

		#start processing data on line 4
		#don't process last 2 lines
		json=$( echo "$data" | tail -n +4 | head -n +2 \
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
		#make sure to remove last comma and print in array
		echo "[" ${json%?} "]" | _parseAndPrint
	else
		#no data found
		echo "[]" | _parseAndPrint
	fi
}

ram_intensive_processes() {

  result=$(/bin/ps axo pid,user,pmem,rss,vsz,comm --sort -pmem,-rss,-vsz \
        | head -n 15 \
        | /usr/bin/awk 'NR>1 {print "{ \"pid\": " $1 \
                      ", \"user\": \"" $2 \
                      "\", \"mem%\": " $3 \
                      ", \"rss\": " $4 \
                      ", \"vsz\": " $5 \
                      ", \"cmd\": \"" $6 \
                      "\"},"}')

  echo [ ${result%?} ] | _parseAndPrint
}

recent_account_logins() {

  result=$(/usr/bin/lastlog -t 365 \
        | /usr/bin/awk 'NR>1 {\
          print "{ \
            \"user\": \"" $1 "\", \
            \"ip\": \"" $3 "\","" \
            \"date\": \"" $5" "$6" "$7" "$8" "$9 "\"},"
          }'
      )
  echo [ ${result%?} ] | _parseAndPrint
}

redis() {

  ########### Enter Your Redis Password  HERE #########
  redisPassword=''
  ########### Enter Your Redis Password  HERE #########

  redisCommand=$(which redis-cli);

  if [ -n "$redisPassword" ]; then
    redisCommand="$redisCommand -a $redisPassword"
  fi

  result=$($redisCommand INFO \
        | grep 'redis_version\|connected_clients\|connected_slaves\|used_memory_human\|total_connections_received\|total_commands_processed' \
        | awk -F: '{print "\"" $1 "\":" "\"" $2 }' \
        | tr '\r' '"' | tr '\n' ','
      )
  echo { ${result%?} } | _parseAndPrint
}

scheduled_crons() {

    ######
    # Credit: http://stackoverflow.com/questions/134906/how-do-i-list-all-cron-jobs-for-all-users#answer-137173
    ######

    catCmd=`which cat`
    awkCmd=`which awk`
    sedCmd=`which sed`
    egrepCmd=`which egrep`
    echoCmd=`which echo`
    crontabCmd=`which crontab`
    trCmd=`which tr`

    # System-wide crontab file and cron job directory. Change these for your system.
    CRONTAB='/etc/crontab'
    CRONDIR='/etc/cron.d'

    # Single tab character. Annoyingly necessary.
    tab=$(echo -en "\t")

    # Given a stream of crontab lines, exclude non-cron job lines, replace
    # whitespace characters with a single space, and remove any spaces from the
    # beginning of each line.
    function clean_cron_lines() {
        while read line ; do
            $echoCmd "${line}" |
                $egrepCmd --invert-match '^($|\s*#|\s*[[:alnum:]_]+=)' |
                $sedCmd --regexp-extended "s/\s+/ /g" |
                $sedCmd --regexp-extended "s/^ //"
        done;
    }

    # Given a stream of cleaned crontab lines, $echoCmd any that don't include the
    # run-parts command, and for those that do, show each job file in the run-parts
    # directory as if it were scheduled explicitly.
    function lookup_run_parts() {
        while read line ; do
            match=$($echoCmd "${line}" | $egrepCmd -o 'run-parts (-{1,2}\S+ )*\S+')

            if [[ -z "${match}" ]] ; then
                $echoCmd "${line}"
            else
                cron_fields=$($echoCmd "${line}" | cut -f1-6 -d' ')
                cron_job_dir=$($echoCmd  "${match}" | awk '{print $NF}')

                if [[ -d "${cron_job_dir}" ]] ; then
                    for cron_job_file in "${cron_job_dir}"/* ; do  # */ <not a comment>
                        [[ -f "${cron_job_file}" ]] && $echoCmd "${cron_fields} ${cron_job_file}"
                    done
                fi
            fi
        done;
    }

    # Temporary file for crontab lines.
    temp=$(mktemp) || exit 1

    # Add all of the jobs from the system-wide crontab file.
    $catCmd "${CRONTAB}" | clean_cron_lines | lookup_run_parts >"${temp}"

    # Add all of the jobs from the system-wide cron directory.
    $catCmd "${CRONDIR}"/* | clean_cron_lines >>"${temp}"  # */ <not a comment>

    # Add each user's crontab (if it exists). Insert the user's name between the
    # five time fields and the command.
    while read user ; do
        $crontabCmd -l -u "${user}" 2>/dev/null |
            clean_cron_lines |
            $sedCmd --regexp-extended "s/^((\S+ +){5})(.+)$/\1${user} \3/" >>"${temp}"
    done < <(cut --fields=1 --delimiter=: /etc/passwd)

    # Output the collected crontab lines.

    ## Changes: Parses output into JSON

    $catCmd "${temp}" \
        | awk 'BEGIN {print "["} \
                    {print "{ \"min\": \"" $1 \
                    "\", \"hrs\": \"" $2 "\", " \
                    " \"day\": \"" $3 "\", " \
                    " \"month\": \"" $4 "\", " \
                    " \"wkday\": \"" $5 "\", " \
                    " \"user\": \"" $6 "\", " \
                    " \"CMD\": \""} \
                        {for(i=7;i<=NF;++i) printf("%s ", gensub("\"", "\\\\\"", "g", $i) ) } \
                    {print "\" " \
                    "}," } \
                END {print "]"}' \
        | $sedCmd 'N;$s/,\n//;P;D' \
        | _parseAndPrint

    rm --force "${temp}"
}

swap() {

  catCmd=`which cat`;
  wcCmd=`which wc`;
  awkCmd=`which awk`

  swapLineCount=$($catCmd /proc/swaps | $wcCmd -l)

  if [ "$swapLineCount" -gt 1 ]; then

    result=$($catCmd /proc/swaps \
        | $awkCmd 'NR>1 {print "{ \"filename\": \"" $1"\", \"type\": \""$2"\", \"size\": \""$3"\", \"used\": \""$4"\", \"priority\": \""$5"\"}," }'
      )

    echo [ ${result%?} ] | _parseAndPrint

  else
    echo [] | _parseAndPrint
  fi
}

upload_transfer_rate() {

	files=(/sys/class/net/*)
	pos=$(( ${#files[*]} - 1 ))
	last=${files[$pos]}

	json_output="{"

	for interface in "${files[@]}"
	do
		basename=$(basename "$interface")

		# find the number of bytes transfered for this interface
		out1=$(cat /sys/class/net/"$basename"/statistics/tx_bytes)

		# wait a second
		sleep 1

		# check same interface again
		out2=$(cat /sys/class/net/"$basename"/statistics/tx_bytes)

		# get the difference (transfer rate)
		out_bytes=$((out2 - out1))

		# convert transfer rate to KB
		out_kbytes=$((out_bytes / 1024))

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
	echo "$json_output}" | _parseAndPrint
}

user_accounts() {

  result=$(/usr/bin/awk -F: '{ \
          if ($3<=499){userType="system";} \
          else {userType="user";} \
          print "{ \"type\": \"" userType "\"" ", \"user\": \"" $1 "\", \"home\": \"" $6 "\" }," }' < /etc/passwd
      )

  length=$(echo ${#result})

  if [ $length -eq 0 ]; then
    result=$(getent passwd | /usr/bin/awk -F: '{ if ($3<=499){userType="system";} else {userType="user";} print "{ \"type\": \"" userType "\"" ", \"user\": \"" $1 "\", \"home\": \"" $6 "\" }," }')
  fi

  echo [ ${result%?} ] | _parseAndPrint
}

fnCalled="$1"

${fnCalled}
