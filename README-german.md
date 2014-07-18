[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/afaqurk/linux-dash/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/afaqurk/linux-dash/?branch=master)
# linux-dash (Beta)

Ein einfach zu bedienendes und kleines Web-Dashboard für Serverstatistiken.

Auf [linuxdash.com](http://www.linuxdash.com/) gibt es eine Demo und eine komplette Dokumentation.

[**Demo**](http://www.linuxdash.com/demo.html) | [**Features**](#features) | [**Installationsanleitung**](#installation) | [**News**](https://github.com/afaqurk/linux-dash#news) | [**Dokumentation**](https://github.com/afaqurk/linux-dash/wiki)

<img src="https://raw.githubusercontent.com/afaqurk/linux-dash/master/linux-dash.PNG">

## Features
* Eine schicke, Webbasierte Benutzeroberfäche
* Kann Auslastungs-, Uptime-, Speicher-, Benutzerinformationen und noch viele weitere Serverstatistiken anzeigen.
* Einfache Installation für Server mit Apache2/nginx und PHP
* Unterstützt viele Linux-Distributionen [(Systeme)](#plattformen)

## Installation
**Vor der Installation sollte man sich dies mal anschauen: [Apache › Wiki › ubuntuusers.de](http://wiki.ubuntuusers.de/Apache#Rechte)**

1. In den Ordner ~ wechseln (`cd ~`)
2. Sichergehen, dass `php5-json` installiert und aktiviert ist (Debian-basierte Systeme: `sudo apt-get install php5-json`)
3. Sourcecode downloaden (`wget https://github.com/afaqurk/linux-dash/archive/master.zip`) oder das Repository klonen
4. Das Archiv entpacken (`unzip master.zip`)
5. Zum Schluss den Ordner `linux-dash-master` nach `/var/www/` kopieren (`sudo mv linux-dash-master /var/www/linux-dash`) (für Apache); Für nginx, einfach mal [das hier](https://gist.github.com/sergeifilippov/8909839) von [@sergeifilippov](https://github.com/sergeifilippov) anschauen

**Information: Wenn man den Zugriff beschränken will, einfach eine
`.htaccess` oder ähnliches hinzufügen. ([Wikipedia](http://de.wikipedia.org/wiki/Htaccess), [Apache Wiki](http://httpd.apache.org/docs/2.4/howto/htaccess.html))**

## Plattformen

*Die Informationen in diesem Abschnitt sind zurzeit noch im Aufbau.*

* Betriebssysteme
    * Arch
    * Debian 6, 7
    * Ubuntu 11.04+
    * Linux Mint 16+
    * CentOS 5, 6
* Apache 2
* Nginx
* PHP 5
* Moderne Browser

## News
* [https://news.ycombinator.com/item?id=7125153](https://news.ycombinator.com/item?id=7125153)
* [http://www.linuxpromagazine.com/Online/Blogs/Productivity-Sauce/Monitor-Your-server-with-Linux-Dash](http://www.linuxpromagazine.com/Online/Blogs/Productivity-Sauce/Monitor-Your-server-with-Linux-Dash)
* [http://www.lafermeduweb.net/billet/linux-dash-un-dashboard-simple-pour-monitorer-votre-serveur-linux-1698.html](http://www.lafermeduweb.net/billet/linux-dash-un-dashboard-simple-pour-monitorer-votre-serveur-linux-1698.html)
* [http://linuxundich.de/ubuntu/linux-dash-als-alternative-zu-monitoring-mittels-phpsysinfo/ (Deutsch)](http://linuxundich.de/ubuntu/linux-dash-als-alternative-zu-monitoring-mittels-phpsysinfo/)
* [http://www.html.it/articoli/monitoring-di-un-server-linux-con-linux-dash/](http://www.html.it/articoli/monitoring-di-un-server-linux-con-linux-dash/)
* [https://www.youtube.com/watch?v=3gb3z-a7XfA (Deutsch)](https://www.youtube.com/watch?v=3gb3z-a7XfA)
* [http://www.ubuntugeek.com/linux-dash-a-low-overhead-monitoring-web-dashboard-for-a-gnulinux-machine.html](http://www.ubuntugeek.com/linux-dash-a-low-overhead-monitoring-web-dashboard-for-a-gnulinux-machine.html)
* [http://www.oschina.net/p/linux-dash](http://www.oschina.net/p/linux-dash)
* [t3n - Schickes Dashboard: Mit linux-dash den Server überwachen (Deutsch)](http://t3n.de/news/dashboard-linux-dash-553038/?utm_content=buffer4aec9&utm_medium=social&utm_source=facebook.com&utm_campaign=buffer)

## Credits:
* [Dashboard Template](http://www.egrappler.com/templatevamp-free-twitter-bootstrap-admin-template/)
* [Bootstrap](http://getbootstrap.com)
* [Font Awesome](http://fontawesome.io/)
