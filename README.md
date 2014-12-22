[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/afaqurk/linux-dash/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/afaqurk/linux-dash/?branch=master)
# linux-dash

A simple, low-overhead monitoring web dashboard for GNU / Linux. 

Simply drop-in the app and go!

Visit [linuxdash.com](http://www.linuxdash.com/) to view demo and full documentation.

[**DEMO**](http://www.linuxdash.com/) | [**Installation Instructions**](#installation)

<img src="https://github.com/afaqurk/linux-dash/screenshots/system-status.png">

## Features
* A beautiful, simple web-based dashboard for monitoring server info
* Live graphs, refresh-able widgets, and a growing # of supported modules 
* Drop-in install for servers with Apache2 or nginx + PHP 
* Support for wide range of linux server flavors [(See Support section)](#support)

## Installation

1. Make sure you have `php5-json` installed and enabled
2. Make sure you have the `exec`, `shell_exec`, and `escapeshellarg` functions enabled
3. [Download the source](https://github.com/afaqurk/linux-dash/archive/master.zip) or clone the repo 
4. Place it in `/var/www/` (for Apache); For nginx setup, see [this gist](https://gist.github.com/sergeifilippov/8909839) by [@sergeifilippov](https://github.com/sergeifilippov)

**Please note: If you would like to limit access to linux-dash, please add
`.htaccess` or other security measure.**

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

## News
* [https://news.ycombinator.com/item?id=7125153](https://news.ycombinator.com/item?id=7125153)
* [http://www.linuxpromagazine.com/Online/Blogs/Productivity-Sauce/Monitor-Your-server-with-Linux-Dash](http://www.linuxpromagazine.com/Online/Blogs/Productivity-Sauce/Monitor-Your-server-with-Linux-Dash)
* [http://www.lafermeduweb.net/billet/linux-dash-un-dashboard-simple-pour-monitorer-votre-serveur-linux-1698.html](http://www.lafermeduweb.net/billet/linux-dash-un-dashboard-simple-pour-monitorer-votre-serveur-linux-1698.html)
* [http://linuxundich.de/ubuntu/linux-dash-als-alternative-zu-monitoring-mittels-phpsysinfo/](http://linuxundich.de/ubuntu/linux-dash-als-alternative-zu-monitoring-mittels-phpsysinfo/)
* [http://www.html.it/articoli/monitoring-di-un-server-linux-con-linux-dash/](http://www.html.it/articoli/monitoring-di-un-server-linux-con-linux-dash/)
* [https://www.youtube.com/watch?v=3gb3z-a7XfA](https://www.youtube.com/watch?v=3gb3z-a7XfA)
* [http://www.ubuntugeek.com/linux-dash-a-low-overhead-monitoring-web-dashboard-for-a-gnulinux-machine.html](http://www.ubuntugeek.com/linux-dash-a-low-overhead-monitoring-web-dashboard-for-a-gnulinux-machine.html)
* [http://www.oschina.net/p/linux-dash](http://www.oschina.net/p/linux-dash)
* [t3n - Schickes Dashboard: Mit linux-dash den Server überwachen (DE)](http://t3n.de/news/dashboard-linux-dash-553038/?utm_content=buffer4aec9&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer)
