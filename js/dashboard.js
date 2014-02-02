// Gets data from provided url and updates DOM element.
function generate_os_data(url, element) {
    $.get(url, function(data) {
        $(element).text(data);
    }, "json");
}

// If dataTable with provided ID exists, destroy it.
function destroy_dataTable(table_id) {
    var table = $("#" + table_id);
    var ex = document.getElementById(table_id);
    if ($.fn.DataTable.fnIsDataTable(ex)) {
        table.hide().dataTable().fnClearTable();
        table.dataTable().fnDestroy();
    }
}

//DataTables
//Sort file size data.
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "file-size-pre": function(a) {
        var x = a.substring(0, a.length - 1);
        var x_unit = (a.substring(a.length - 1, a.length) === "M" ?
                      1000 : (a.substring(a.length - 1, a.length) === "G" ?
                              1000000 : 1));

        return parseInt(x * x_unit, 10);
    },

    "file-size-asc": function(a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "file-size-desc": function(a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

//DataTables
//Sort numeric data which has a percent sign with it.
jQuery.extend(jQuery.fn.dataTableExt.oSort, {
    "percent-pre": function(a) {
        var x = (a === "-") ? 0 : a.replace(/%/, "");
        return parseFloat(x);
    },

    "percent-asc": function(a, b) {
        return ((a < b) ? -1 : ((a > b) ? 1 : 0));
    },

    "percent-desc": function(a, b) {
        return ((a < b) ? 1 : ((a > b) ? -1 : 0));
    }
});

/*******************************
  Data Call Functions
 *******************************/

var dashboard = {};

dashboard.getPs = function() {
    $.get("sh/ps.php", function(data) {
        destroy_dataTable("ps_dashboard");
        $("#filter-ps").val("").off("keyup");

        var psTable = $("#ps_dashboard").dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "USER" },
                { sTitle: "PID" },
                { sTitle: "%CPU" },
                { sTitle: "%MEM" },
                { sTitle: "VSZ" },
                { sTitle: "RSS" },
                { sTitle: "TTY" },
                { sTitle: "STAT" },
                { sTitle: "START" },
                { sTitle: "TIME" },
                { sTitle: "COMMAND" }
            ],
            bPaginate: true,
            sPaginationType: "full_numbers",
            bFilter: true,
            sDom: "lrtip",
            bAutoWidth: false,
            bInfo: false
        }).fadeIn();

        $("#filter-ps").on("keyup", function() {
            psTable.fnFilter(this.value);
        });
    }, "json");
}

dashboard.getUsers = function() {
    $.get("sh/users.php", function(data) {
        destroy_dataTable("users_dashboard");

        $("#users_dashboard").dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "Type" },
                { sTitle: "User" },
                { sTitle: "Home" }
            ],
            aaSorting: [[0, "desc"]],
            iDisplayLength: 5,
            bPaginate: true,
            sPaginationType: "full_numbers",
            bFilter: false,
            bAutoWidth: false,
            bInfo: false
        }).fadeIn();
    }, "json");
    $("select[name='users_dashboard_length']").val("5");
}

dashboard.getOnline = function() {
    $.get("sh/online.php", function(data) {
        destroy_dataTable("online_dashboard");

        $("#online_dashboard").dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "Who" },
                { sTitle: "From" },
                { sTitle: "Login At" },
                { sTitle: "Idle" }
            ],
            aaSorting: [[0, "desc"]],
            iDisplayLength: 5,
            bPaginate: true,
            sPaginationType: "full_numbers",
            bFilter: false,
            bAutoWidth: false,
            bInfo: false
        }).fadeIn();
    }, "json");
    $("select[name='online_dashboard_length']").val("5");
}

dashboard.getRam = function() {
    $.get("sh/mem.php", function(data) {
        var ram_total = data[1];
        var ram_used = parseInt((data[2] / ram_total) * 100, 10);
        var ram_free = parseInt((data[3] / ram_total) * 100, 10);

        $("#ram-total").text(ram_total);
        $("#ram-used").text(data[2]);
        $("#ram-free").text(data[3]);

        $("#ram-free-per").text(ram_free);
        $("#ram-used-per").text(ram_used);
    }, "json");
}

dashboard.getDf = function() {
    $.get("sh/df.php", function(data) {
        var table = $("#df_dashboard");
        var ex = document.getElementById("df_dashboard");
        if ($.fn.DataTable.fnIsDataTable(ex)) {
            table.hide().dataTable().fnClearTable();
            table.dataTable().fnDestroy();
        }

        table.dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "Filesystem" },
                { sTitle: "Size", sType: "file-size" },
                { sTitle: "Used", sType: "file-size" },
                { sTitle: "Avail", sType: "file-size" },
                { sTitle: "Use%", sType: "percent" },
                { sTitle: "Mounted" }
            ],
            bPaginate: false,
            bFilter: false,
            bAutoWidth: true,
            bInfo: false
        }).fadeIn();
    }, "json");
}

dashboard.getWhereIs = function() {
    $.get("sh/whereis.php", function(data) {
        var table = $("#whereis_dashboard");
        var ex = document.getElementById("whereis_dashboard");
        if ($.fn.DataTable.fnIsDataTable(ex)) {
            table.hide().dataTable().fnClearTable();
            table.dataTable().fnDestroy();
        }

        table.dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "Software" },
                { sTitle: "Installation" }
            ],
            bPaginate: false,
            bFilter: false,
            aaSorting: [[1, "desc"]],
            bAutoWidth: false,
            bInfo: false
        }).fadeIn();
    }, "json");
}

dashboard.getOs = function() {
    generate_os_data("sh/issue.php", "#os-info");
    generate_os_data("sh/hostname.php", "#os-hostname");
    generate_os_data("sh/uptime.php", "#os-uptime");
}

dashboard.getIp = function() {
    $.get("sh/ip.php", function(data) {
        destroy_dataTable("ip_dashboard");
        $("#ip_dashboard").dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "Interface" },
                { sTitle: "IP" }
            ],
			iDisplayLength: 5,
			bPaginate: true,
            sPaginationType: "two_button",
            bFilter: false,
            bAutoWidth: true,
            bInfo: false
        }).fadeIn();
    }, "json");
}

dashboard.getIspeed = function() {
    var rate = $("#ispeed-rate");

    // 0 = KB
    // 1 = MB
    var AS = 0;
    var power = AS+1;
    var result = 0;

    $.get("sh/speed.php", function(data) {
        // round the speed (float to int);
        // dependent on value of AS, calculate speed in MB or KB ps
        result = Math.floor((data/(Math.pow(1024,power))));
        // update rate of speed on widget
        rate.text(result);

    });
    // update unit value in widget
    var lead = rate.next(".lead");
    lead.text(AS ? "MB/s" : "KB/s");
}

dashboard.getLoadAverage = function() {
    $.get("sh/loadavg.php", function(data) {
        $("#cpu-1min").text(data[0][0]);
        $("#cpu-5min").text(data[1][0]);
        $("#cpu-15min").text(data[2][0]);
        $("#cpu-1min-per").text(data[0][1]);
        $("#cpu-5min-per").text(data[1][1]);
        $("#cpu-15min-per").text(data[2][1]);
    }, "json");
}

dashboard.getNumberOfCores = function() {
    generate_os_data("sh/numberofcores.php", "#core-number");
}



// Function that calls all the other functions which refresh
// each individual widget.
dashboard.getAll = function() {
    dashboard.getRam();
    dashboard.getPs();
    dashboard.getDf();
    dashboard.getOs();
    dashboard.getUsers();
    dashboard.getOnline();
    dashboard.getWhereIs();
    dashboard.getIp();
    dashboard.getIspeed();
    dashboard.getLoadAverage();
    dashboard.getNumberOfCores();
}

dashboard.fnMap = {
    all: dashboard.getAll,
    ram: dashboard.getRam,
    ps: dashboard.getPs,
    df: dashboard.getDf,
    os: dashboard.getOs,
    users: dashboard.getUsers,
    online: dashboard.getOnline,
    whereis: dashboard.getWhereIs,
    ip: dashboard.getIp,
    ispeed: dashboard.getIspeed,
    cpu: dashboard.getLoadAverage,
};
