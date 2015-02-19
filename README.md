# Linux Dash

A simple, low-overhead web dashboard for GNU / Linux. (~1MB)

[**DEMO**](http://linuxdash.afaqtariq.com) | [**Installation Instructions**](#installation) | [**Digital Ocean Tutorial**](https://www.digitalocean.com/community/tutorials/how-to-install-linux-dash-on-ubuntu-14-04)

![Linux Dash screenshot](https://raw.githubusercontent.com/afaqurk/screenshots/master/linux-dash/system-status-full.png)

## Features
* A beautiful, simple web-based dashboard for monitoring a linux server
* Only ~1MB on disk! *(.git removed)*
* Live graphs, refresh-able widgets, and a growing # of supported modules
* Drop-in install for PHP (Apache, NGINX), Node.js, and Go 

## Installation

### 1. Download Linux Dash

**Pick 1** of the following methods to download Linux Dash:
- Clone the git repo: `git clone https://github.com/afaqurk/linux-dash.git`
- Use composer, run `composer create-project afaqurk/linux-dash -s dev`
- [download the source](https://github.com/afaqurk/linux-dash/archive/master.zip)
 
### 2. Secure Linux Dash
*It is strongly recommended that all Linux Dash installations be password protected.*

### 3. Start Linux Dash
See the instructions section for the platform of your preference. 

*Note*: All stacks of Linux Dash provide the same functionality. You may switch platforms at any time without any further downloads.

#### PHP
1. Make sure you have the `exec`, `shell_exec`, and `escapeshellarg` functions enabled
2. Restart Apache or nginx 
  - Follow the [Digital Ocean tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-linux-dash-on-ubuntu-14-04) for PHP + Apache setup.
  - For help with nginx setup, see [this gist](https://gist.github.com/sergeifilippov/8909839) by [@sergeifilippov](https://github.com/sergeifilippov).

#### Node.js
1. Run `npm install`
2. Start Linux Dash by running: `node server`
  - Default port is 80. You may change this in [server/index.js on line 8](https://github.com/afaqurk/linux-dash/blob/master/server/index.js#L8)

#### Go
1. Go to the linux-dash/server folder and run `go run index.go`
  - To build a binary, run `go build && ./server -h`
  - See [@tehbilly](https://github.com/sergeifilippov)'s notes [here](https://github.com/afaqurk/linux-dash/pull/281) for binary usage options

## Goals for v2.0
- [x] Backend ported to ~~Python~~ shell scripts & python from PHP
- [x] Add config file
- [x] Segregate core code-base and modules
- [ ] ~~Each module in a separate directory with front-end template, back-end file, bash script~~
- [ ] Add info popover UI element for modules
- [ ] Angular tests
- [ ] Back-end tests
  - [ ] for shell files
  - [ ] for PHP, NodeJS, & Go
- Add project to package managers
  - [x] npm
  - [x] composer
  - [ ] aur
  - [ ] apt
- [x] Bonus: 
  - [x] multiple server side languages supported
  - [ ] use websockets in PHP & NodeJS

## Support
* OS
 * Arch
 * Debian 6,7
 * Ubuntu 11.04+
 * Linux Mint 16+
 * CentOS 5, 6
* Backend
 * Node.js
 * Go
 * PHP 5
  * Apache 2
  * Nginx
 
