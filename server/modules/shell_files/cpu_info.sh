#!/bin/bash

result=$(/usr/bin/lscpu \
		| /usr/bin/awk -F: '{print "\""$1"\": \""$2"\"," }	'\
		)

echo "{" ${result%?} "}"