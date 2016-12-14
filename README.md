<br/>
<h1 align="center">
  Monitoring Dashboard
</h1>

<p align="center">
  Server monitoring in linux without logging in
</p>


<p align="center">
  <strong>
    <a href="#installation">
      <i>Installation</i></a> &nbsp;|&nbsp;
  </strong>
</p>

## Installation

#### Step 1: Download Linux Dash

Clone the git repo
```sh
git clone https://github.com/riginoommen/linux-dash.git
```

Or download it **[here](https://github.com/riginoommen/linux-dash/archive/master.zip)**.

#### Step 2: Secure Linux Dash

Linux Dash does not provide any security or authentication features.

**It is strongly recommended** that all Linux Dash installations be protected via a security measure of your choice.

#### Step 3: Start Linux Dash
<h6 align="center">
Linux Dash can be run in: <u>Node.js</u>, PHP, Go, or Python. 
<br/>
<sub>
* Node.js is the recommended platform since it has native support for websockets and fast I/O.
</sub>
</h6>

First, navigate to the `linux-dash` folder you downloaded or cloned.

Then, refer to the section for your preferred platform:

##### Node.js

Install NPM dependencies
```
npm install
```

Start Linux Dash 
```
node server/
```

Default port for Linux Dash is 80. You may change this in [server/index.js on line 9](https://github.com/riginoommen/linux-dash/blob/master/server/index.js#L9)

<br/>
##### PHP
1. Make sure you have the `exec`, `shell_exec`, and `escapeshellarg` functions enabled
2. Restart your web server (Apache, nginx, etc.) 
  - For PHP + Apache setup follow the [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-linux-dash-on-ubuntu-14-04).
  - For help with nginx setup, see [this gist](https://gist.github.com/sergeifilippov/8909839) by [@sergeifilippov](https://github.com/sergeifilippov).

<br/>
##### Go
Go to the `linux-dash/server` folder and run 
```
go run index.go
```

To build a binary, run `go build && ./server -h`. See [@tehbilly](https://github.com/sergeifilippov)'s notes [here](https://github.com/riginoommen/linux-dash/pull/281) for binary usage options

##### Python
Run `./python-server.py` will run a server on port 80 which is the default. You can change this in [python-server.py on line 43](https://github.com/riginoommen/linux-dash/blob/master/python-server.py#L43)

