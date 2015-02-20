#!/bin/bash
result=$(redis-cli INFO \
			| grep 'redis_version\|connected_clients\|connected_slaves\|used_memory_human\|total_connections_received\|total_commands_processed' \
			| awk -F: '{print "\"" $1 "\":" "\"" $2 }' \
			| tr '\r' '"' | tr '\n' ','
		)
echo { ${result%?} }