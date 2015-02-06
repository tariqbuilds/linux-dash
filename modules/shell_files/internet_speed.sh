#!/bin/bash

SCRIPTPATH=`dirname $(readlink -f $0)`
SPEED_TEST_SCRIPT=$SCRIPTPATH"/../python_files/speedtest_cli.py"

$SPEED_TEST_SCRIPT \
| grep 'Upload\|Download' \
| awk 'BEGIN {print "{"} {print "\"" $1 "\": \"" $2 " " $3 "\"," } END {print "}"}' \
| /bin/sed 'N;$s/",/"/;P;D'