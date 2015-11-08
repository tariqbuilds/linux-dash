#!/bin/bash

awkCmd=`which awk`
catCmd=`which cat`
grepCmd=`which grep`
memInfoFile="/proc/meminfo"

# References:
#   Calculations: http://zcentric.com/2012/05/29/mapping-procmeminfo-to-output-of-free-command/
#   Fields: https://www.kernel.org/doc/Documentation/filesystems/proc.txt

memInfo=`$catCmd $memInfoFile | $grepCmd 'MemTotal\|MemFree\|Buffers\|Cached'`

echo $memInfo | $awkCmd '{print "{ \"total\": " ($2/1024) ", \"used\": " ( ($2-($5+$8+$11))/1024 ) ", \"free\": " (($5+$8+$11)/1024) " }"  }'
