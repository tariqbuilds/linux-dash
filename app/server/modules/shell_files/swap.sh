#!/bin/bash

catCmd=`which cat`;
wcCmd=`which wc`;
awkCmd=`which awk`

swapLineCount=$($catCmd /proc/swaps | $wcCmd -l)

if [ "$swapLineCount" -gt 1 ]; then

  result=$($catCmd /proc/swaps \
			| $awkCmd 'NR>1 {print "{ \"filename\": \"" $1"\", \"type\": \""$2"\", \"size\": \""$3"\", \"used\": \""$4"\", \"priority\": \""$5"\"}," }'
		)

  echo [ ${result%?} ]

else
  echo []
fi
