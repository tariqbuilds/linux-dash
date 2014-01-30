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

function get_ps() {
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

function get_users() {
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

function get_online() {
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

function get_ram() {
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

function get_df() {
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

function get_whereis() {
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

function get_os_info() {
    generate_os_data("sh/issue.php", "#os-info");
    generate_os_data("sh/hostname.php", "#os-hostname");
    generate_os_data("sh/uptime.php", "#os-uptime");
}

function get_ip() {
    $.get("sh/ip.php", function(data) {
        destroy_dataTable("ip_dashboard");
        $("#ip_dashboard").dataTable({
            aaData: data,
            aoColumns: [
                { sTitle: "Interface" },
                { sTitle: "IP" }
            ],
            bPaginate: false,
            bFilter: false,
            bAutoWidth: true,
            bInfo: false
        }).fadeIn();
    }, "json");
}

function get_ispeed() {
    var rate = $("#ispeed-rate");

    // 0 = MB
    // 1 = KB
    var AS = 1;

    $.get("sh/speed.php?as=" + AS, function(data) {
        rate.text(data);
    });

    var lead = rate.next(".lead");
    lead.text(AS ? "KB/s" : "MB/s");
}

// Function that calls all the other functions which refresh
// each individual widget.
function refresh_all() {
    get_ram();
    get_ps();
    get_df();
    get_os_info();
    get_users();
    get_online();
    get_whereis();
    get_ip();
    get_ispeed();
}

// Initialize Page function calls
refresh_all();
