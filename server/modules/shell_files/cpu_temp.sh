#!/bin/bash
if [ `which sensors` ]; then
  returnString=`sensors`
  #amd
  if [[ "${returnString/"k10"}" != "${returnString}" ]] ; then
    echo ${returnString##*k10} | cut -d ' ' -f 6 | cut -c 2- | cut -c 1-4
  #intel
  elif [[ "${returnString/"core"}" != "${returnString}" ]] ; then
    fromcore=${returnString##*"coretemp"}
    echo ${fromcore##*Core}  | cut -d ' ' -f 2 |  cut -c 2-5
  fi
else
  echo "[]"
fi

