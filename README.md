# linux-dash

A low-overhead monitoring web dashboard for a GNU/Linux machine. Simply drop-in
the app and go!

[**View Demo**](http://afaq.dreamhosters.com/linux-dash/) | [**View Features**](#features) | [**Installation Instructions**](#installation) | [**Documentation**](https://github.com/afaqurk/linux-dash/wiki)

![Demonstration](http://afaq.dreamhosters.com/linux-dash.PNG)

## Features
* A beautiful web-based dashboard for monitoring server info
* Live, on-demand monitoring of RAM, Load, Uptime, Disk Allocation, Users and many more system stats
* Drop-in install for servers with Apache2/nginx + PHP
* Click and drag to re-arrange widgets
* Support for wide range of linux server flavors [(See Support section)](#support)

## Installation

1. Make sure you have `php5-json` and `php5-curl` installed and enabled
2. Download the zip/repo/package
3. Place it in `/var/www/` (for Apache); For nginx setup, see [this gist](https://gist.github.com/sergeifilippov/8909839) by [@sergeifilippov](https://github.com/sergeifilippov)
4. Optional: Secure access to the page via `.htaccess` or method of your choice
 


**Please note: If you would like to limit access to the webpage, please add
`.htaccess` or other security measure.**

## Support

*The information listed here is currently limited and will expand shortly.*

* OS
    * Arch
    * Debian 6, 7
    * Ubuntu 11.04+
    * Linux Mint 16+
* Apache 2
* Nginx
* PHP 5
* Modern browsers

## Credits:
* [Dashboard Template](http://www.egrappler.com/templatevamp-free-twitter-bootstrap-admin-template/)
* [Bootstrap](http://getbootstrap.com)
