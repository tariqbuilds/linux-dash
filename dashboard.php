<?php
if(!isset($_SESSION)){session_start();}
if(!isset($_SESSION['user']))
	exit();
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>Server Monitoring Dashboard</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
<meta name="apple-mobile-web-app-capable" content="yes">
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/bootstrap-responsive.min.css" rel="stylesheet">
<link href="http://fonts.googleapis.com/css?family=Open+Sans:400italic,600italic,400,600" rel="stylesheet">
<link href="//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.min.css" rel="stylesheet">
<link href="css/style.css" rel="stylesheet">
<link href="css/pages/dashboard.css" rel="stylesheet">
<link href="css/odometer.css" rel="stylesheet">
<!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
<!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
</head>
<body>

<!-- Github Fork Image-->
<a href="https://github.com/afaqurk/linux-dash"><img style="position: absolute; top: 0; right: 0; border: 0;z-index:99999999;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png" alt="Fork me on GitHub"></a>

<div class="navbar navbar-fixed-top" style="">
  <div class="navbar-inner">
    <div class="container"> 
        
        <a class="brand" href="index.html">Linux Bootstrap Dashboard </a>
      <div class="nav-collapse">
            
      </div>
      <!--/.nav-collapse --> 
    </div>
    <!-- /container --> 
  </div>
  <!-- /navbar-inner --> 
</div>
<!-- /navbar -->
<div class="subnavbar visible-desktop visible-tablet">
  <div class="subnavbar-inner">
    <div class="container">
      <ul class="mainnav">
        <li><a href="#refresh-os"><i class="icon-dashboard"></i><span>General</span> </a> </li>
        <li><a href="#refresh-df"><i class="icon-list-alt"></i><span>Disk</span> </a> </li>
        <li><a href="#refresh-ps"><i class="icon-list-alt"></i><span>CPU</span> </a> </li>
        <li><a href="#refresh-ram"><i class="icon-list-alt"></i><span>RAM</span> </a> </li>
        <li><a href="#refresh-users"><i class="icon-group"></i><span>Users</span> </a> </li>
        <li><a href="#refresh-ispeed"><i class="icon-exchange"></i><span>Network</span> </a> </li>
      </ul>
    </div>
    <!-- /container --> 
  </div>
  <!-- /subnavbar-inner --> 
</div>
<!-- /subnavbar -->
<div class="main">
  <div class="main-inner"> 
    <div class="container">
    
        <div align="center" class="lead">
            
            <div class="btn"><i class="icon-off"></i></div><br>
            
            A simple web dashboard to monitor your server.
            
        </div>
        
     <div class="row">
        
        <div class="span6">
         <div class="widget widget-table action-table">
            <div class="widget-header"> <i class="icon-info-sign"></i>
              <h3>General Info</h3>
              
              <div class="btn btn-mini" onClick="javascript:get_os_info();spin_icon(this);" id="refresh-os"> 
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
            
              </div>
                
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                <br>
              <div style="text-align:center;">
              <b>OS:</b> <span class="" id="os-info"></span><br>
              <b>Uptime:</b> <span class="odometer" id="os-uptime"></span> Hours<br>
              <b>Hostname:</b> <span class="" id="os-hostname"></span><br>
              <br><br>
              </div>
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
        </div>
        
        <div class="span6">
         <div class="widget widget-nopad">
            <div class="widget-header"> 
                <i class="icon-list-alt"></i>
                <h3>RAM</h3>
                <div id="refresh-ram" onClick="javascript:get_ram();" class="btn btn-mini">
                     <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
                </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
              <div class="widget big-stats-container">
                <div class="widget-content">
                  
                  <div id="big_stats" class="cf">
                    <div class="stat"> 
                        <i class="icon-#">Total</i>
                        <span class="value odometer" id="ram-total"></span> MB
                    </div>
                    <!-- .stat -->
                    
                    <div class="stat"> 
                        <i class="icon-#">Used</i>
                        <span class="value odometer" id="ram-used"></span> MB 
                        <br><span class="value odometer" id="ram-used-per"></span> %
                    </div>
                    <!-- .stat --> 
                    
                    <div class="stat"> 
                        <i class="icon-#">Free</i>
                        <span class="value odometer" id="ram-free"></span> MB
                        <br><span class="value odometer" id="ram-free-per"></span> %
                        
                    </div>
                    <!-- .stat --> 
                  
                      
                  </div>
                </div>
                <!-- /widget-content --> 
                
              </div>
            </div>
          </div>
        </div>
        
     </div>
    
    <div class="row">
         <div class="span6">
           <div class="widget">
            <div class="widget-header"> <i class="icon-list"></i>
              <h3>Disk Usage</h3>
              <div id="refresh-df" onClick="javascript:get_df();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                <div class="btn btn-error">Test</div>
              <table id="df_dashboard" class="table table-hover table-condensed table-bordered" >
              </table>
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
         </div>
         
          <div class="span6">
            <div class="widget widget-table action-table">
            <div class="widget-header"> <i class="icon-group"></i>
              <h3>Users</h3>
              <div id="refresh-users" onClick="javascript:get_users();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                
              <table id="users_dashboard" class="table table-hover table-bordered table-condensed" >
              </table>
              
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
            <div class="widget widget-table action-table">
            <div class="widget-header"> <i class="icon-group"></i>
              <h3>Online</h3>
              <div id="refresh-online" onClick="javascript:get_online();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                
              <table id="online_dashboard" class="table table-hover table-bordered table-condensed" >
              </table>
              
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
          </div>
        <!-- /span6 --> 
       
         
        </div>
    <!-- /row -->
    
    
      <div class="row">
         <div class="span6">
           <div class="widget">
            <div class="widget-header"> <i class="icon-list"></i>
              <h3>Software</h3>
              <div id="refresh-whereis" onClick="javascript:get_whereis();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                
              <table id="whereis_dashboard" class="table table-hover table-condensed table-bordered" >
              </table>
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
         </div><!-- /span -->
         
         <div class="span3">
           <div class="widget">
            <div class="widget-header"> <i class="icon-monitor"></i>
              <h3>IP</h3>
              <div id="refresh-whereis" onClick="javascript:get_ip();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                <table id="ip_dashboard" class="table table-hover table-condensed table-bordered" >
                </table>
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
         </div><!-- /span -->
         
         <div class="span3">
           <div class="widget">
            <div class="widget-header"> <i class="icon-monitor"></i>
              <h3>Internet Speed</h3>
              <div id="refresh-ispeed" onClick="javascript:get_ispeed();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                <div align="center" style="padding:10px;">
                    <span class="lead odometer" style="margin-top:11px;" id="ispeed-rate"></span>
                    <span class="lead">Mbps</span>
                </div>
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget -->
         </div><!-- /span -->
         
      </div>
      <!-- /row -->
      <div class="row">
        <div class="span12">
          <div class="widget">
            <div class="widget-header"> <i class="icon-dashboard"></i>
              <h3> Processes </h3>
              <div id="refresh-ps" onClick="javascript:get_ps();" class="btn btn-mini">
                <i class="icon-refresh"></i> &nbsp;&nbsp;Refresh
              </div>
            </div>
            <!-- /widget-header -->
            <div class="widget-content">
                
              <table id="ps_dashboard" class="table table-hover table-condensed table-bordered" >
              </table>
            </div>
            <!-- /widget-content --> 
          </div>
          <!-- /widget --> 
        </div>
        <!-- /span -->
          
      </div>
      <!-- /row -->
      
      </div>
      
    </div>
    <!-- /container --> 
  </div>
  <!-- /main-inner --> 
</div>
<!-- /main -->

<div class="footer">
  <div class="footer-inner">
    <div class="container">
      <div class="row">
        <div class="span12"> &copy; 2013 <a href="http://github.com/afaqurk">Afaq Tariq</a>. </div>
        <!-- /span12 --> 
      </div>
      <!-- /row --> 
    </div>
    <!-- /container --> 
  </div>
  <!-- /footer-inner --> 
</div>
<!-- /footer --> 
<!-- Le javascript
================================================== --> 
<!-- Placed at the end of the document so the pages load faster --> 
<script src="js/jquery.js"></script> 
<script src="js/bootstrap.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/jquery.dataTables.min.js"></script>
<script src="js/odometer.js"></script>
<script src="js/magic_happens_here.js"></script>

</body>
</html>
