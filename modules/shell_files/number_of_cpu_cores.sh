#!/bin/bash

numberOfCores=$(/bin/grep -c 'model name' /proc/cpuinfo)

if [length($numberOfCores)]; then
	echo "cannnot be found";
fi