#!/bin/bash
######
# Credit: http://stackoverflow.com/questions/134906/how-do-i-list-all-cron-jobs-for-all-users#answer-137173
######

catCmd=`which cat`
awkCmd=`which awk`
sedCmd=`which sed`
egrepCmd=`which egrep`
echoCmd=`which echo`
crontabCmd=`which crontab`

# System-wide crontab file and cron job directory. Change these for your system.
CRONTAB='/etc/crontab'
CRONDIR='/etc/cron.d'

# Single tab character. Annoyingly necessary.
tab=$(echo -en "\t")

# Given a stream of crontab lines, exclude non-cron job lines, replace
# whitespace characters with a single space, and remove any spaces from the
# beginning of each line.
function clean_cron_lines() {
    while read line ; do
        $echoCmd "${line}" |
            $egrepCmd --invert-match '^($|\s*#|\s*[[:alnum:]_]+=)' |
            $sedCmd --regexp-extended "s/\s+/ /g" |
            $sedCmd --regexp-extended "s/^ //"
    done;
}

# Given a stream of cleaned crontab lines, $echoCmd any that don't include the
# run-parts command, and for those that do, show each job file in the run-parts
# directory as if it were scheduled explicitly.
function lookup_run_parts() {
    while read line ; do
        match=$($echoCmd "${line}" | $egrepCmd -o 'run-parts (-{1,2}\S+ )*\S+')

        if [[ -z "${match}" ]] ; then
            $echoCmd "${line}"
        else
            cron_fields=$($echoCmd "${line}" | cut -f1-6 -d' ')
            cron_job_dir=$($echoCmd  "${match}" | awk '{print $NF}')

            if [[ -d "${cron_job_dir}" ]] ; then
                for cron_job_file in "${cron_job_dir}"/* ; do  # */ <not a comment>
                    [[ -f "${cron_job_file}" ]] && $echoCmd "${cron_fields} ${cron_job_file}"
                done
            fi
        fi
    done;
}

# Temporary file for crontab lines.
temp=$(mktemp) || exit 1

# Add all of the jobs from the system-wide crontab file.
$catCmd "${CRONTAB}" | clean_cron_lines | lookup_run_parts >"${temp}" 

# Add all of the jobs from the system-wide cron directory.
$catCmd "${CRONDIR}"/* | clean_cron_lines >>"${temp}"  # */ <not a comment>

# Add each user's crontab (if it exists). Insert the user's name between the
# five time fields and the command.
while read user ; do
    $crontabCmd -l -u "${user}" 2>/dev/null |
        clean_cron_lines |
        $sedCmd --regexp-extended "s/^((\S+ +){5})(.+)$/\1${user} \3/" >>"${temp}"
done < <(cut --fields=1 --delimiter=: /etc/passwd)

# Output the collected crontab lines.

## Changes: Parses output into JSON

$catCmd "${temp}" \
    | awk 'BEGIN {print "["} \
                {print "{ \"min(s)\": \"" $1 \
                "\", \"hours(s)\": \"" $2 "\", " \
                " \"day(s)\": \"" $3 "\", " \
                " \"month\": \"" $4 "\", " \
                " \"weekday\": \"" $5 "\", " \
                " \"user\": \"" $6 "\", " \
                " \"command\": \"" $7$8$9$10 "\" " \
                "}," } \
            END {print "]"}' \
    | $sedCmd 'N;$s/,\n/\n/;P;D'

rm --force "${temp}"