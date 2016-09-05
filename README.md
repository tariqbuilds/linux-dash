<br/>
<h1 align="center">
  linux-dash
</h1>

<p align="center">
  A simple, low-overhead web dashboard for Linux
</p>

<p align="center">
<small>Check out what's coming in <a href="https://linux-dash.github.io/docs/#getting-started">Linux Dash v2.0</a>: in Fall 2016.</small>
</p>

<p align="center">
  <strong>
    <a href="http://linuxdash.afaqtariq.com"><i>Demo</i></a> &nbsp;|&nbsp;
    <a href="#features"><i>Features</i></a> &nbsp;|&nbsp;
    <a href="#installation">
      <i>Installation</i></a> &nbsp;|&nbsp;
    <a href="#support"><i>Support</i></a>
  </strong>
</p>

<p align="center">
  <a href="https://gitter.im/afaqurk/linux-dash">
    <img 
      src="https://badges.gitter.im/gitterHQ/gitter.png" 
      alt="Linux Dash Gitter chat">
  </a>
</p>

<br/>
<p align="center">
  <a href="http://linuxdash.afaqtariq.com">
    <img 
      width="80%"
      alt="Linux Dash screenshot" 
      src="http://i.imgur.com/tehGyrQ.gif">
  </a>
</p>

<br/>

## Features
* A beautiful, simple web-based dashboard for monitoring a linux server
* Only ~1MB on disk! *(.git removed)*
* Live graphs, refresh-able widgets, and a growing # of supported modules
* Drop-in installation for PHP, Node.js, Python, and Go 

## Installation

#### Step 1: Download Linux Dash

Clone the git repo
```sh
git clone https://github.com/afaqurk/linux-dash.git
```

Or download it **[here](https://github.com/afaqurk/linux-dash/archive/master.zip)**.

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

Default port for Linux Dash is 80. You may change this in [server/index.js on line 9](https://github.com/afaqurk/linux-dash/blob/master/server/index.js#L9)

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

To build a binary, run `go build && ./server -h`. See [@tehbilly](https://github.com/sergeifilippov)'s notes [here](https://github.com/afaqurk/linux-dash/pull/281) for binary usage options

##### Python
Run `./python-server.py` will run a server on port 80 which is the default. You can change this in [python-server.py on line 43](https://github.com/afaqurk/linux-dash/blob/master/python-server.py#L43)

## Support

For help with general setup and configuration issues please use the [Linux Dash Gitter chat room](https://gitter.im/afaqurk/linux-dash).

The following distributions are supported:
* Arch
* Debian 6,7
* Ubuntu 11.04+
* Linux Mint 16+
* CentOS 5, 6
* openSUSE
