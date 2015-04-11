#!/usr/bin/env python

import os
from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer, test as _test
import subprocess
from SocketServer import ThreadingMixIn

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

if __name__ == '__main__':
    server = ThreadedHTTPServer(('localhost', 8081), MainHandler)
    print 'Starting server, use <Ctrl-C> to stop'
    server.serve_forever()
