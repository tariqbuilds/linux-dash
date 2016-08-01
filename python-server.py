#!/usr/bin/env python

import argparse
import os
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer, test as _test
import subprocess
from SocketServer import ThreadingMixIn
from daemonize import Daemonize

modulesSubPath = '/server/modules/shell_files/'
serverPath = os.path.dirname(os.path.realpath(__file__))

class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass

class MainHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            data = ''
            contentType = 'text/html'
            if self.path.startswith("/server/"):
                module = self.path.split('=')[1]
                output = subprocess.Popen(
                    serverPath + modulesSubPath + module + '.sh',
                    shell = True,
                    stdout = subprocess.PIPE)
                data = output.communicate()[0]
            else:
                if self.path == '/':
                    self.path = 'index.html'
                f = open(os.path.dirname(os.path.realpath(__file__)) + os.sep + self.path)
                data = f.read()
                if self.path.startswith('/css/'):
                    contentType = 'text/css'
                f.close()
            self.send_response(200)
            self.send_header('Content-type', contentType)
            self.end_headers()
            self.wfile.write(data)

        except IOError:
            self.send_error(404, 'File Not Found: %s' % self.path)

def main(args):
    server = ThreadedHTTPServer((args.host, args.port), MainHandler)
    print 'Starting server, use <Ctrl-C> to stop'
    server.serve_forever()

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Run linux dash')
    parser.add_argument('--host', dest='host', default='0.0.0.0',
                    help='interface to listen on')
    parser.add_argument('--port', dest='port', type=int, default=80,
                    help='port to listen on')
    parser.add_argument('--daemonize', dest='daemonize', action='store_true',
                    help='Daemonize linux dash server')
    parser.add_argument('--pid', dest='pid', default='/tmp/linux-dash.pid',
                    help='Pid file for daemon mode')
    args = parser.parse_args()

    if args.daemonize:
        def _main():
            main(args)
        daemon = Daemonize(app="linux-dash", pid=args.pid, action=_main, chdir=os.path.dirname(os.path.abspath(__file__)))
        daemon.start()
    else:
        main(args)
