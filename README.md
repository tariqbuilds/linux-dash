# Linux Dash

A simple, low-overhead web dashboard for GNU / Linux. (~1MB)

[**DEMO**](http://linuxdash.afaqtariq.com/demo.html) | [**Installation Instructions**](#installation)

## Features
* A beautiful, simple web-based dashboard for monitoring server info
* Only 1MB on disk! (with .git removed)
* Live graphs, refresh-able widgets, and a growing # of supported modules 
* Drop-in install for servers with Apache2 or nginx + PHP 
* Easy to customize and extend
* Support for wide range of linux server flavors [(See Support section)](#support)

## Installation

1. Make sure you have `php5-json` installed and enabled
2. Make sure you have the `exec`, `shell_exec`, and `escapeshellarg` functions enabled
3. [Download the source](https://github.com/afaqurk/linux-dash/archive/master.zip) or clone the repo 
4. Place it in `/var/www/` (for Apache); For nginx setup, see [this gist](https://gist.github.com/sergeifilippov/8909839) by [@sergeifilippov](https://github.com/sergeifilippov)

**Please note: If you would like to limit access to linux-dash, please add
`.htaccess` or other security measure.**

## Goals for v2.0
- [ ] Backend ported to Python from PHP
- [ ] Add config file
- [ ] Segregate core code-base and modules
  - Each module in a separate directory with front-end template, back-end file, bash script
- [ ] Add project to package managers

## Support

*The information listed here is currently limited and will expand shortly.*

* OS
    * Arch
    * Debian 6, 7
    * Ubuntu 11.04+
    * Linux Mint 16+
    * CentOS 5, 6
* Apache 2
* Nginx
* PHP 5
* Modern browsers
