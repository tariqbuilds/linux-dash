<h4 align="center">
  linux-dash
</h4>

<p align="center">
  <small>A simple, low-overhead web dashboard for Linux</small>
</p>

<p align="center">
  <a href="http://linuxdash.afaqtariq.com"><i>Demo</i></a> &nbsp;|&nbsp;
  <a href="#features"><i>Features</i></a> &nbsp;|&nbsp;
  <a href="#installation">
    <i>Installation</i></a> &nbsp;|&nbsp;
  <a href="#support"><i>Support</i></a>
</p>

<p align="center">
  <a href="https://gitter.im/afaqurk/linux-dash">
    <img
      src="https://badges.gitter.im/gitterHQ/gitter.png"
      alt="linux-dash Gitter chat">
  </a>
</p>

<p align="center">
  <a href="http://linuxdash.afaqtariq.com">
    <img
      width="80%"
      alt="linux-dash screenshot"
      src="http://i.imgur.com/tehGyrQ.gif">
  </a>
</p>

<br/>

## Features
* A beautiful, simple web-based dashboard for monitoring a linux server
* Only ~500KB on disk! *(you can cut that in 1/2 by removing `.git/`)*
* Live graphs, refresh-able widgets, and a growing # of supported modules
* Drop-in installation for PHP, Node.js, Python, and Go

## Installation

```sh

## clone the repo
git clone --depth 1 https://github.com/afaqurk/linux-dash.git

## go to the cloned directory
cd linux-dash/app/server

## OR

## alternatively, you can download the .zip
curl -LOk https://github.com/afaqurk/linux-dash/archive/master.zip && unzip master.zip

cd linux-dash-master/app/server

```

Pick the platform to run linux-dash on:

* [Node.js](#nodejs) (recommended)
* [Go](#go)
* [Python](#python)
* [PHP](#php)
* C++ (_coming soon_)

<br/>
#### Node.js

```sh
## install NPM dependencies
npm install --production

## start linux-dash (on port 80 by default)
node index.js
```

<br/>
#### Go
```sh
## start the server
go run index.go
```

To build a binary, run `go build && ./server -h`. See [@tehbilly](https://github.com/sergeifilippov)'s notes [here](https://github.com/afaqurk/linux-dash/pull/281) for binary usage options

<br/>
#### Python

```sh
# Start the server (on port 80 by default).
python index.py
```

<br/>
#### PHP
1. Make sure you have the `exec`, `shell_exec`, and `escapeshellarg` functions enabled
2. Point your web server to `app/` directory under `linux-dash`
2. Restart your web server (Apache, nginx, etc.)
  - For PHP + Apache setup follow the [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-linux-dash-on-ubuntu-14-04).
  - For help with nginx setup, see [this gist](https://gist.github.com/sergeifilippov/8909839) by [@sergeifilippov](https://github.com/sergeifilippov).

## Support

For general help, please use the [Gitter chat room](https://gitter.im/afaqurk/linux-dash).

## Security

**It is strongly recommended** that all linux-dash installations be protected via a security measure of your choice.


linux-dash does not provide any security or authentication features.
