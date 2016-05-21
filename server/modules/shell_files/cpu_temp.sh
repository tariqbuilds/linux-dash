#!/bin/bash
if [ `which sensors` ]; then
  returnString=`sensors`
  if [[ "${returnString/"k10"}" != "${returnString}" ]] ; then
    echo ${returnString##*k10} | cut -d ' ' -f 6 | cut -c 2- | cut -c 1-4 
  elif [[ "${returnString/"ore"}" != "${returnString}" ]] ; then
    echo 90
  fi  
fi
