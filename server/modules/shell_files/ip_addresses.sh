awkCmd=`which awk`
grepCmd=`which grep`
sedCmd=`which sed`
ifconfigCmd=`which ifconfig`
trCmd=`which tr`
wgetCmd=`which wget`

externalIp=`$wgetCmd -qO- curlmyip.com`

$ifconfigCmd \
| $grepCmd -B1 "inet addr" \
| $awkCmd '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:" ,$1 } }' \
| $awkCmd -F: 'BEGIN {print "["} { print "{ \"interface\": \"" $1 "\", \"ip\": \"" $3 "\" },"} END {print "{ \"interface\": \"external\", \"ip\": \""'$externalIp'"\" } ]"}' \
| $trCmd -d '\r\n' 