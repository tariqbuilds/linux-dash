#!/bin/bash

# Split sensors output on empty lines and write it to temporary files
csplit --elide-empty-files --quiet --suppress-matched -f /tmp/lmsens-$$ <(sensors -Au) "/^$/" "{*}"

# Construct a json array consisting of the individual sensors with their readings
JSON="["

for file in /tmp/lmsens-$$*; do

    # Generate JSON from lm_sensors output through awk
    SENSOR=$(awk -F: 'BEGIN { print "{" }

    FNR == 1 { getline nextline < FILENAME }
    {
        getline nextline < FILENAME
        if ($2 == "") {
            print "\""$1"\": {"
        } else {
            if (substr(nextline, 0, 1) == " ") {
                gsub(/^[ \t]+|[ \t]+$/, "", $1)
                gsub(/^[ \t]+|[ \t]+$/, "", $2)
                print "\""$1"\":\""$2"\","
            } else {
                gsub(/^[ \t]+|[ \t]+$/, "", $1)
                gsub(/^[ \t]+|[ \t]+$/, "", $2)
                print "\""$1"\":\""$2"\" },"
            }
        }
    }
    END { print "}}" }' "$file")

    # Replace last comma with closing curly brace
    JSON="$JSON ${SENSOR%,*} } ${SENSOR##*,},"

    # Clean up temporary file from csplit
    rm "$file"
done

# Remove last comma and add closing square bracket for end of array
JSON="${JSON%,*} ${JSON##*,}]"

# Just print the damn thing
echo $JSON
