#!/usr/bin/perl


my($devinfo_re, $devstat_re, $action_re) = (
    '(md\d+)\s+:\s+active\s+(\(read-only\)\s+|\(auto-read-only\)\s+|)(\w+)\s+(.*)',
    '.*\[(\d+)\/(\d+)]\s+\[(\w+)]',
    '.*(reshape|check|resync|recovery)\s*=\s*(\d+\.\d+%|\w+)(.*finish=(.*min))?',
);
# Interestingly, swap is presented as "active (auto-read-only)"
# and mdadm has '--readonly' option to make the array 'active (read-only)'
print "[";

open(my $mdstat, "/proc/mdstat");
my(@text) = <$mdstat>;
# contents of <$mdstat> may be changed at next reading, so fetch the contents at a time
close($mdstat);

my($dev, $ro, $type, $members, $nmem, $nact, $status, $action, $proc, $minute, $idx);
while (@text) {
    my $line = shift @text;
    if ($line =~ /$devinfo_re/) {
        # first line should like "active raid1 sda1[0] sdc1[2] sdb1[1]"
        $dev = $1;
        $ro = $2 || '';
        $type = $3;
        $members = $4;

        $line = shift @text;
        if ($line =~ /$devstat_re/) {
            # second line should like "123456 blocks super 1.2 [2/2] [UU]"
            $nmem = $1;
            $nact = $2;
            $status = $3;
        }
        else {
            # sencond line did not exist on /proc/mdstat
            next;
        }

        $line = shift @text;
        if ($line =~ /$action_re/) {
            # third line should like " [==>..................]  check = 10.0% (12345/123456) finish=123min speed=12345/sec"
            # this line will appear only when the array is in action
            $action = $1;
            my $percent = $2;
            $minute = $4 || '';
            if ($percent =~ /(\d+\.\d+)%/) {
                $proc = $1;
            }
            else {
                # 'resync=DELAYED' or 'resync=PENDING'
                $action .= " ($percent)";
                $proc = -1;
            }
        }
        else {
            # array is not in action
            $action = 'idle';
            $minute = '';
            unshift(@text, $line);
        }
    }
    else {
        # skip until first line is found
        next;
    }

    if ( $ARGV[0] and $ARGV[0] eq "config" ) {
        print "$dev.label $dev\n";
        print "$dev.info $type $ro$members\n";
        # 100: means less than 100
        # Because of an unfound bug, sometimes reported as 99.XX even when OS reports 100.
        print "$dev.critical 98:\n";
        print $dev, "_rebuild.label $dev reshape/recovery\n";
        print $dev, "_rebuild.info $action $minute\n";
        # Because of an unfound bug, sometimes reported as 99.XX even when OS reports 100.
        print $dev, "_rebuild.critical 98:\n";
        print $dev, "_check.label $dev check/resync \n";
        print $dev, "_check.info $action $minute\n";
    } else {
        my $pct = 100 * $nact / $nmem;
        my $rpct = 100;
        my $cpct = 100;
        if ($action =~ /reshape|recovery/) {
            $rpct = $proc;
            $cpct = 0;  # check/resync is not done
        }
        elsif ($action =~ /check|resync/) {
            if ($proc < 0) {
                # array is on DELAYED or PENDING, further info is unknown
                $rpct = 0;
                $cpct = 0;
            }
            else {
                # reshape/recovery was done, $rpct => 100
                $cpct = $proc;
            }
        }

        if($idx > 0) {
          print ", \n";
        }
        print "{ \"device\": \"$dev\", \"value\": $pct, \"rebuild\": $rpct, \"check\": $cpct }";

    }
    $idx = $idx + 1;

}
print "]";
