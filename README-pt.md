# linux-dash (Beta)

Um painel de monitorização com baixa sobrecarga para máquinas GNU/Linux. Basta colocar no servidor e utilizar!

**Esta documentação está em Português mas o software está integralmente em Inglês.**

[**Ver Demo**](http://afaq.dreamhosters.com/linux-dash/) | [**Ver Funcionalidades**](#features) | [**Instalação Instruções**](#installation) | [**Novidades**](https://github.com/afaqurk/linux-dash/news) | [**Documentação**](https://github.com/afaqurk/linux-dash/wiki)

![Demonstração](http://afaq.dreamhosters.com/linux-dash.PNG)

## Funcionalidades
* Um painel *web-based* para monitorizar informação do servidor
* Monitorização em tempo real de RAM, carga, *uptime*, alocação em disco, utilizadores e muito mais estatísticas do servidor
* Instalação *drop-in* em servidores Apache2/nginx + PHP
* Clicar e arrastar para reorganizar *widgets* 
* Suporte para uma vasta variada de distribuições linux [(See Support section)](#support)

## Instalação

1. Garantir que o `php5-json` está instalado e activo
2. Transferir a pasta zip/repo/package
3. Colocá-la em `/var/wwww/` (para Apache); Para nginx, ver [this gist](https://gist.github.com/sergeifilippov/8909839) por [@sergeifilippov](https://github.com/sergeifilippov)
4. Opcional: garantir segurança no acesso através de `.htaccess` ou outro método à escolha
 


**Nota: Se desejar limitar o acesso à página, adicionar `.htaccess`
ou outra método à escolha**

## Suporte

*A informação listada em baixo é limitada e vai ser expandida os mais rapidamente possível.*

* SO
    * Arch
    * Debian 6, 7
    * Ubuntu 11.04+
    * Linux Mint 16+
* Apache 2
* Nginx
* PHP 5
* Browsers actuais

## Novidades
* [https://news.ycombinator.com/item?id=7125153](https://news.ycombinator.com/item?id=7125153)
* [http://www.linuxpromagazine.com/Online/Blogs/Productivity-Sauce/Monitor-Your-server-with-Linux-Dash](http://www.linuxpromagazine.com/Online/Blogs/Productivity-Sauce/Monitor-Your-server-with-Linux-Dash)
* [http://www.lafermeduweb.net/billet/linux-dash-un-dashboard-simple-pour-monitorer-votre-serveur-linux-1698.html](http://www.lafermeduweb.net/billet/linux-dash-un-dashboard-simple-pour-monitorer-votre-serveur-linux-1698.html)
* [http://linuxundich.de/ubuntu/linux-dash-als-alternative-zu-monitoring-mittels-phpsysinfo/](http://linuxundich.de/ubuntu/linux-dash-als-alternative-zu-monitoring-mittels-phpsysinfo/)
* [http://www.html.it/articoli/monitoring-di-un-server-linux-con-linux-dash/](http://www.html.it/articoli/monitoring-di-un-server-linux-con-linux-dash/)
* [https://www.youtube.com/watch?v=3gb3z-a7XfA](https://www.youtube.com/watch?v=3gb3z-a7XfA)
* [http://www.ubuntugeek.com/linux-dash-a-low-overhead-monitoring-web-dashboard-for-a-gnulinux-machine.html](http://www.ubuntugeek.com/linux-dash-a-low-overhead-monitoring-web-dashboard-for-a-gnulinux-machine.html)
* [http://www.oschina.net/p/linux-dash](http://www.oschina.net/p/linux-dash)

## Créditos:
* [Dashboard Template](http://www.egrappler.com/templatevamp-free-twitter-bootstrap-admin-template/)
* [Bootstrap](http://getbootstrap.com)
* [Font Awesome](http://fontawesome.io/)
