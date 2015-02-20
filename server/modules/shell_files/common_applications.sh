#!/bin/bash
result=$(whereis php node mysql mongo vim python ruby java apache2 nginx openssl vsftpd make \
| awk -F: '{if(length($2)==0) { installed="false"; } else { installed="true"; } \
			print \
			"{ \
				\"binary\": \""$1"\", \
				\"location\": \""$2"\", \
				\"installed\": "installed" \
			},"}')

echo "[" ${result%?} "]"