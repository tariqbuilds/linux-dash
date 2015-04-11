awkCmd=`which awk`
grepCmd=`which grep`
sedCmd=`which sed`
ifconfigCmd=`which ifconfig`
trCmd=`which tr`
digCmd=`which dig`

externalIp=`$digCmd +short myip.opendns.com @resolver1.opendns.com`

$ifconfigCmd \
| $grepCmd -B1 "inet addr" \
| $awkCmd '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:" ,$1 } }' \
| $awkCmd -v exIp="$externalIp" -F: 'BEGIN {print "["} { print "{ \"interface\": \"" $1 "\", \"ip\": \"" $3 "\" },"} END {print "{ \"interface\": \"external\", \"ip\": \""exIp"\" } ]"}' \
| $trCmd -d '\r\n' 
