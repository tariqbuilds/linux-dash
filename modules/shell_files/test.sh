awkCmd=`which awk`
grepCmd=`which grep`
sedCmd=`which sed`
ifconfigCmd=`which ifconfig`
trCmd=`which tr`

$ifconfigCmd \
| $grepCmd -B1 "inet addr" \
| $awkCmd '{ if ( $1 == "inet" ) { print $2 } else if ( $2 == "Link" ) { printf "%s:" ,$1 } }' \
| $awkCmd -F: 'BEGIN {print "["} { print "{ \"interface\": \"" $1 "\", \"ip\": \"" $3 "\" },"} END {print "]"}' \
| $trCmd -d '\r\n' \
| $sedCmd 's/\},]/}]/g'
 