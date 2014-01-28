<?php
session_start();
if(isset($_POST['user'])) {
    $valid_users = array(
        array('username' => 'admin', 'password' => 'admin'),
        array('username' => 'example', 'password' => 'example')
    );
    foreach($valid_users as $user) {
        if($user['username'] == $_POST['user'] and $user['password'] == $_POST['password']) {
            $_SESSION['user'] = $user['username'];
	}
    }
}

if(isset($_SESSION['user'])) {
    require_once('dashboard.php');
    exit();
}
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>linux-dash</title>
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <style type="text/css">
      html, body {
        background-color: #eee;
      }
      body {
        padding-top: 40px; 
      }
      .container {
        width: 300px;
      }

      .container > .content {
        background-color: #fff;
        padding: 20px;
        margin: 0 -20px; 
        -webkit-border-radius: 10px 10px 10px 10px;
           -moz-border-radius: 10px 10px 10px 10px;
                border-radius: 10px 10px 10px 10px;
        -webkit-box-shadow: 0 1px 2px rgba(0,0,0,.15);
           -moz-box-shadow: 0 1px 2px rgba(0,0,0,.15);
                box-shadow: 0 1px 2px rgba(0,0,0,.15);
      }

	  .login-form {
		margin-left: 65px;
	  }
	
	  legend {
		margin-right: -50px;
		font-weight: bold;
	  	color: #404040;
	  }

    </style>

</head>
<body>
  <div class="container">
    <div class="content">
      <div class="row">
        <div class="login-form">
          <h2>Login</h2>
          <form action="" method="post">
            <fieldset>
              <div class="clearfix">
                <input type="text" name="user" placeholder="Username">
              </div>
              <div class="clearfix">
                <input type="password" name="password" placeholder="Password">
              </div>
              <button class="btn primary" type="submit">Login</button>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
</body>
</html>
