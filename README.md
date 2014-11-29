[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/afaqurk/linux-dash/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/afaqurk/linux-dash/?branch=master)
# linux-dash (Beta)

A low-overhead monitoring web dashboard for a GNU/Linux machine. Simply drop-in
the app and go!

Visit [linuxdash.com](http://www.linuxdash.com/) to view demo and full documentation.

[**View DEMO**](http://www.linuxdash.com/) | [**View Features**](#features) | [**Installation Instructions**](#installation) | [**News**](https://github.com/afaqurk/linux-dash#news) | [**Documentation**](https://github.com/afaqurk/linux-dash/wiki)

<img src="https://raw.githubusercontent.com/afaqurk/linux-dash/master/linux-dash.PNG">

## Features
* A beautiful web-based dashboard for monitoring server info
* Live, on-demand monitoring of RAM, Load, Uptime, Disk Allocation, Users and many more system stats
* Drop-in install for servers with Apache2/nginx + PHP
* Click and drag to re-arrange widgets
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

## Credits:
* [Dashboard Template](http://www.egrappler.com/templatevamp-free-twitter-bootstrap-admin-template/)
* [Bootstrap](http://getbootstrap.com)
* [Font Awesome](http://fontawesome.io/)
